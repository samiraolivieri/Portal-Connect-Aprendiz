const User = require('../models/userModel');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    // Comparação simples para o seu PI (em produção usaríamos bcrypt)
    if (user.senha === password) {
      // Retornamos os dados para o React saber qual tela mostrar (Aprendiz, Empresa ou SENAI)
      return res.status(200).json({
        message: "Login realizado!",
        user: {
          id: user.id,
          nome: user.nome,
          perfil: user.perfil, // Aqui o React decide a rota: /aprendiz, /gestor ou /pedagogo
          unidade: user.unidade
        }
      });
    } else {
      return res.status(401).json({ message: "Senha incorreta." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao conectar com o banco de dados." });
  }
};