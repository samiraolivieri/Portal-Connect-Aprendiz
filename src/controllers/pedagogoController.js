const db = require("../config/db");

exports.buscarAprendiz = async (req, res) => {
  const { nome } = req.params;
  const { turma_id } = req.query;

  try {
    let query = "SELECT id, nome FROM usuarios WHERE nome LIKE ? AND nivel = 'aprendiz'";
    let params = [`%${nome}%`];

    // Só adiciona o filtro de turma se o turma_id for válido (não null/undefined)
    if (turma_id && turma_id !== 'null') {
      query += " AND turma_id = ?";
      params.push(turma_id);
    }

    const [usuarios] = await db.execute(query, params);
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar");
  }
};



// 📄 Listar justificativas pendentes
exports.listarJustificativas = async (req, res) => {
  try {
    const turmaId = req.query.turma_id;

    const [rows] = await db.query(`
  SELECT 
    a.id,
    u.nome,
    a.titulo,
    a.motivo,
    a.descricao,
    a.status_instituicao AS status
  FROM atestados_justificativas a
  JOIN usuarios u ON u.id = a.aprendiz_id
  WHERE u.turma_id = ?
  AND a.status_instituicao = 'pendente'
`, [turmaId]);

    console.log("BACKEND JUSTIFICATIVAS:", rows); // 🔥 DEBUG

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};


// ✅ Atualizar justificativa (aprovar/recusar)
exports.atualizarJustificativa = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    await db.query(
      `UPDATE atestados_justificativas
   SET status_instituicao = ?
   WHERE id = ?`,
      [status, id]
    );

    res.json({ mensagem: `Justificativa ${status}!` });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};



// 📢 Criar comunicado
exports.criarComunicado = async (req, res) => {
  try {
    const { titulo, conteudo, autor_id } = req.body;

    if (!titulo || !conteudo || !autor_id) {
      return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    await db.query(
      `INSERT INTO comunicados 
      (autor_id, titulo, conteudo, tipo_alvo, data_publicacao)
      VALUES (?, ?, ?, ?, CURDATE())`,
      [autor_id, titulo, conteudo, "aprendiz"]
    );

    res.json({ mensagem: "Comunicado publicado!" });
  } catch (error) {
    console.error("ERRO AO SALVAR:", error);
    res.status(500).json({ erro: error.message });
  }
};



// 📢 Listar comunicados
exports.listarComunicados = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.titulo, c.conteudo, c.data_publicacao, u.nome AS autor
      FROM comunicados c
      JOIN usuarios u ON u.id = c.autor_id
      ORDER BY c.data_publicacao DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};



// 📊 Buscar estatísticas
exports.buscarEstatisticas = async (req, res) => {
  try {
    const turmaId = req.query.turma_id;

    const [[alunos]] = await db.query(
      `SELECT COUNT(*) as total 
       FROM usuarios 
       WHERE nivel = 'aprendiz' AND turma_id = ?`,
      [turmaId]
    );

    const [[presenca]] = await db.query(
      `SELECT AVG(b.frequencia_percentual) as media
       FROM boletins b
       JOIN usuarios u ON u.id = b.aprendiz_id
       WHERE u.turma_id = ?`,
      [turmaId]
    );

    const [[materiais]] = await db.query(
      `SELECT COUNT(*) as total 
       FROM materiais 
       WHERE turma_id = ?`,
      [turmaId]
    );

    res.json({
      alunos: alunos.total,
      presenca: presenca.media || 0,
      materiais: materiais.total
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};



// 📚 Listar materiais
exports.listarMateriais = async (req, res) => {
  try {
    const turmaId = req.query.turma_id;

    const [rows] = await db.query(
      `SELECT * 
       FROM materiais 
       WHERE turma_id = ?
       ORDER BY data_publicacao DESC`,
      [turmaId]
    );

    res.json(rows);
  } catch (err) {
    console.error("ERRO COMPLETO:", err);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



// 📤 Criar material
exports.criarMaterial = async (req, res) => {
  try {
    const { titulo, descricao, link_material, turma_id } = req.body;

    if (!titulo || !descricao) {
      return res.status(400).json({ error: "Preencha os campos obrigatórios" });
    }

    await db.query(
      `INSERT INTO materiais 
      (titulo, descricao, link_material, turma_id, data_publicacao)
      VALUES (?, ?, ?, ?, NOW())`,
      [titulo, descricao, link_material, turma_id]
    );

    res.json({ mensagem: "Material criado!" });
  } catch (err) {
    console.error("ERRO AO CRIAR MATERIAL:", err);
    res.status(500).json({ error: err.message });
  }
};

