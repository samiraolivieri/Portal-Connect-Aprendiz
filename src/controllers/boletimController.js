const Boletin = require('../models/boletim');

exports.getBoletim = async (req, res) => {
  const { aprendizId } = req.params;
  try {
    const boletim = await Boletin.findByAprendizId(aprendizId);

    if (!boletim || boletim.length === 0) {
      return res.status(200).json({ media_geral: "0.0", disciplinas: [] });
    }

    const soma = boletim.reduce((acc, curr) => acc + (parseFloat(curr.nota) || 0), 0);
    const media = soma / boletim.length;

    res.status(200).json({
      media_geral: media.toFixed(1),
      disciplinas: boletim 
    });
  } catch (error) {
    console.error("Erro no Controller:", error);
    res.status(500).json({ message: "Erro interno" });
  }
};