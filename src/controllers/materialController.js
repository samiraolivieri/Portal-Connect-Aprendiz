const Material = require('../models/material');

exports.publicarMaterial = async (req, res) => {
    try {
        const arquivo_path = req.file ? req.file.filename : null;

        const dadosParaSalvar = {
            ...req.body,
            arquivo_path: arquivo_path
        };

        await Material.create(dadosParaSalvar);
        
        res.status(201).json({ message: "Material publicado com sucesso!" });
    } catch (err) {
        console.error("Erro ao publicar material:", err);
        res.status(500).json({ error: "Erro ao publicar material", details: err.message });
    }
}; // <--- IMPORTANTE: Feche a função aqui!

exports.listarMateriais = async (req, res) => {
    try {
        const materiais = await Material.getAll();
        res.json(materiais);
    } catch (err) {
        console.error("Erro ao buscar materiais:", err);
        res.status(500).json({ error: "Erro ao buscar materiais" });
    }
}; // Esta função agora está no nível principal e correta!