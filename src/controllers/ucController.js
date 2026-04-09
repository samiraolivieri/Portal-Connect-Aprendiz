const UC = require('../models/UC');

exports.getUCs = async (req, res) => {
  try {
    const unidadesCurriculares = await UC.findAll();
    res.status(200).json(unidadesCurriculares);
  } catch (error) {
    console.error("Erro ao buscar UCs:", error);
    res.status(500).json({ message: "Erro ao carregar as unidades curriculares." });
  }
};