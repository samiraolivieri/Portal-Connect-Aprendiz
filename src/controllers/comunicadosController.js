const Comunicado = require('../models/comunicado');

// Verifique se o nome é EXATAMENTE getComunicados
exports.getComunicados = async (req, res) => {
  try {
    const avisos = await Comunicado.findAll();
    res.status(200).json(avisos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao carregar o mural de avisos." });
  }
};