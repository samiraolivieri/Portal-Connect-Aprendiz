const Unidade = require('../models/unidade');

exports.getUnidades = async (req, res) => {
  try {
    const listaUnidades = await Unidade.findAll();
    res.status(200).json(listaUnidades);
  } catch (error) {
    console.error("Erro ao buscar unidades:", error);
    res.status(500).json({ message: "Erro ao carregar a lista de unidades." });
  }
};