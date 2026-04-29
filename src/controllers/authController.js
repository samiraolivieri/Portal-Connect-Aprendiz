const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Como seu Model já retorna rows[0], 'user' já é o objeto do usuário.
    const user = await User.findByEmail(email);
    console.log("Usuário encontrado:", user);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }
    console.log("Senha vinda do banco:", user.senha);

    // O bcrypt compara a senha digitada com a coluna 'senha' do banco
    const senhaValida = await bcrypt.compare(password, user.senha);

    if (senhaValida) {
      // Ajustamos os nomes das propriedades para bater com as colunas do seu MySQL
      return res.status(200).json({
        message: "Login realizado com sucesso!",
        user: {
          id: user.id,
          nome: user.nome,
          nivel: user.nivel,
          unidade: user.unidade_id,
          turma_id: user.turma_id 
        }
      });
    } else {
      return res.status(401).json({ message: "E-mail ou senha incorretos." });
    }
  } catch (error) {
    // É bom logar o erro real no console para você debugar se algo falhar
    console.error("Erro interno no login:", error);
    res.status(500).json({ message: "Erro ao processar o login." });
  }
};