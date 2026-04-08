const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // 1. Importe o bcrypt

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    console.log("Usuário encontrado:", user);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }
    console.log("Senha vinda do banco:", user.senha);

    // 2. O bcrypt compara a senha digitada com o "hash" salvo no MySQL
    const senhaValida = await bcrypt.compare(password, user.senha);

    if (senhaValida) {
      // Retornamos os dados para o React saber qual tela mostrar
      return res.status(200).json({
        message: "Login realizado com sucesso!",
        user: {
          id: user.id,
          nome: user.nome,
          perfil: user.perfil, 
          unidade: user.unidade
        }
      });
    } else {
      return res.status(401).json({ message: "E-mail ou senha incorretos." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar o login." });
  }
};