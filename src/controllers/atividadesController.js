const AtividadePendente = require('../models/atividadePendente');

// Use "exports.nomeDaFuncao" para que a rota consiga encontrá-la
exports.getAtividades = async (req, res) => {
  const { userId } = req.params;

  try {
    const atividades = await AtividadePendente.findByUserId(userId);
    res.status(200).json(atividades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar atividades." });
  }
};