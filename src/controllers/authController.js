const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Importe sua conexão com o banco aqui

// --- FUNÇÃO DE LOGIN ATUALIZADA (COM TRIM PARA EVITAR ERRO 401) ---
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    console.log("Tentativa de login para:", email);

    if (!user) {
      console.log("Usuário não encontrado.");
      return res.status(401).json({ message: "E-mail ou senha incorretos." });
    }

    // --- A LÓGICA DE SENHA REAL ---
    // Usamos o .trim() para garantir que não existam espaços invisíveis
    // O bcrypt.compare faz a mágica de bater o '1010' com a criptografia do banco
    const senhaValida = await bcrypt.compare(password.toString().trim(), user.senha);

    console.log("A senha digitada bate com a criptografia do banco?", senhaValida);

    if (senhaValida) {
      return res.status(200).json({
        message: "Login realizado com sucesso!",
        user: {
          id: user.id,
          nome: user.nome,
          nivel: user.nivel,
          unidade: user.unidade_id
        }
      });
    } else {
      console.log("Senha incorreta!");
      return res.status(401).json({ message: "E-mail ou senha incorretos." });
    }
  } catch (error) {
    console.error("Erro interno no login:", error);
    res.status(500).json({ message: "Erro ao processar o login." });
  }
};
// --- LISTAR APRENDIZES ---
exports.listarAprendizes = async (req, res) => {
    const query = "SELECT id, nome FROM usuarios WHERE nivel = 'aprendiz' ORDER BY nome ASC";
    
    try {
        const [results] = await db.query(query); 
        res.json(results); 
    } catch (err) {
        console.error("Erro ao buscar aprendizes:", err);
        return res.status(500).json({ error: "Erro ao carregar lista de aprendizes." });
    }
};