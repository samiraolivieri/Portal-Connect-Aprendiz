const db = require("../config/db");

// Buscar aluno
exports.buscarAprendiz = async (req, res) => {
  try {
    const nome = req.params.nome;

    const [rows] = await db.query(
      `SELECT id, nome, email, nivel
       FROM usuarios
       WHERE nivel = 'aprendiz'
       AND LOWER(nome) LIKE LOWER(?)`,
      [`%${nome}%`]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Listar justificativas pendentes
exports.listarJustificativas = async (req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT 
  a.id,
  u.nome,
  a.titulo,
  a.motivo,
  a.descricao,
  a.status
FROM atestados_justificativas a
JOIN usuarios u ON u.id = a.aprendiz_id
WHERE a.status = 'pendente''
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Aprovar justificativa
exports.atualizarJustificativa = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body; // aprovado ou recusado

    await db.query(
      `UPDATE atestados_justificativas
       SET status = ?
       WHERE id = ?`,
      [status, id]
    );

    res.json({ mensagem: `Justificativa ${status}!` });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Criar comunicado
exports.criarComunicado = async (req, res) => {
  try {
    const { titulo, conteudo } = req.body;

    await db.query(
      `INSERT INTO comunicados
      (autor_id, titulo, conteudo, tipo_alvo, data_publicacao)
      VALUES (3, ?, ?, 'aprendiz', CURDATE())`,
      [titulo, conteudo]
    );

    res.json({ mensagem: "Comunicado publicado!" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
exports.listarComunicados = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT titulo, conteudo, data_publicacao
      FROM comunicados
      ORDER BY data_publicacao DESC
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
exports.buscarEstatisticas = async (req, res) => {
  try {
    const [[alunos]] = await db.query(
      "SELECT COUNT(*) as total FROM usuarios WHERE nivel = 'aprendiz'"
    );

    const [[presenca]] = await db.query(
      "SELECT AVG(frequencia_percentual) as media FROM boletins"
    );

    const [[materiais]] = await db.query(
      "SELECT COUNT(*) as total FROM materiais"
    );

    res.json({
      alunos: alunos.total,
      presenca: presenca.media || 0,
      materiais: materiais.total
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
// 📚 LISTAR MATERIAIS
exports.listarMateriais = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM materiais ORDER BY data_publicacao DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📤 CRIAR MATERIAL
exports.criarMaterial = async (req, res) => {
  const { titulo, descricao, link_material, turma_id } = req.body;

  try {
    await db.query(
      "INSERT INTO materiais (titulo, descricao, link_material, turma_id, data_publicacao) VALUES (?, ?, ?, ?, NOW())",
      [titulo, descricao, link_material, turma_id]
    );

    res.json({ mensagem: "Material criado!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};