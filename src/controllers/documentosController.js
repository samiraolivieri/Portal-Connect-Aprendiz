const Documento = require('../models/documento');
const fs = require('fs');
const path = require('path');

// Tipos de documento permitidos
const TIPOS_PERMITIDOS = ['atestado', 'contracheque', 'declaracao', 'contrato', 'outro'];

exports.uploadDocumento = async (req, res) => {
  const { aprendizId } = req.params;
  const { tipo } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }

    if (!tipo || !TIPOS_PERMITIDOS.includes(tipo)) {
      // Remove o arquivo que já foi salvo pelo multer antes de retornar erro
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: `Tipo inválido. Use um dos seguintes: ${TIPOS_PERMITIDOS.join(', ')}`
      });
    }

    const url_arquivo = `uploads/${req.file.filename}`;

    const novoId = await Documento.create({
      aprendiz_id: aprendizId,
      tipo,
      url_arquivo
    });

    res.status(201).json({
      message: "Documento enviado com sucesso.",
      documento: {
        id: novoId,
        aprendiz_id: aprendizId,
        tipo,
        url_arquivo
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer upload do documento." });
  }
};

exports.getDocumentos = async (req, res) => {
  const { aprendizId } = req.params;
  const { tipo } = req.query; // ex: GET /documentos/5?tipo=contracheque

  try {
    const documentos = await Documento.findByAprendizId(aprendizId, tipo || null);

    if (documentos.length === 0) {
      return res.status(404).json({ message: "Nenhum documento encontrado." });
    }

    res.status(200).json({
      aprendiz_id: aprendizId,
      total: documentos.length,
      documentos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar documentos." });
  }
};

exports.deleteDocumento = async (req, res) => {
  const { id } = req.params;

  try {
    const documento = await Documento.findById(id);

    if (!documento) {
      return res.status(404).json({ message: "Documento não encontrado." });
    }

    // Remove o arquivo físico da pasta uploads
    const caminhoArquivo = path.resolve(__dirname, '../../', documento.url_arquivo);
    if (fs.existsSync(caminhoArquivo)) {
      fs.unlinkSync(caminhoArquivo);
    }

    await Documento.deleteById(id);

    res.status(200).json({ message: "Documento deletado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar documento." });
  }
};