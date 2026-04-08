const OportunidadeCarreira = require('../models/oportunidadeCarreira');

exports.getOportunidades = async (req, res) => {
  try {
    const vagas = await OportunidadeCarreira.findAll();
    res.status(200).json(vagas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao carregar oportunidades de carreira." });
  }
};