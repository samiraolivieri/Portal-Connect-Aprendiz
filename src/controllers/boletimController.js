const Boletin = require('../models/boletim');

exports.getBoletim = async (req, res) => {
  const { aprendizId } = req.params;

  try {
    const boletim = await Boletin.findByAprendizId(aprendizId);

    if (boletim.length === 0) {
      return res.status(404).json({ message: "Nenhum dado acadêmico encontrado." });
    }

    // Calculando uma média rápida para o Dashboard (Visão Gerencial)
    const mediaGeral = boletim.reduce((acc, curr) => acc + curr.nota, 0) / boletim.length;

    res.status(200).json({
      aprendiz_id: aprendizId,
      media_geral: mediaGeral.toFixed(1),
      disciplinas: boletim
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar dados do boletim." });
  }
};