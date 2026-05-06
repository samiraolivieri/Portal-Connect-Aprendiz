const Contato = require('../models/contato');

// Use exatamente este nome: getContatos
exports.getContatos = async (req, res) => {
  try {
    const listaContatos = await Contato.findAll();
    res.status(200).json(listaContatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar contatos dos gestores." });
  }
};