const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. IMPORTAÇÃO DAS ROTAS
const AtestadoRoutes = require('./routes/AtestadoRoutes');
const atividadesRoutes = require('./routes/atividadesRoutes');
const boletimRoutes = require('./routes/boletimRoutes');
const comunicadosRoutes = require('./routes/comunicadosRoutes');
const contatosRoutes = require('./routes/contatosRoutes');
const oportunidadesRoutes = require('./routes/oportunidadesRoutes');
const ucRoutes = require('./routes/ucRoutes');
const authRoutes = require('./routes/authRoutes');
const unidadesRoutes = require('./routes/unidadesRoutes');
const documentosRoutes = require('./routes/documentosRoutes');
const desempenhoRoutes = require('./routes/desempenhoRoutes'); 
const contrachequeRoutes = require('./routes/contrachequeRoutes'); 
const turmasRoutes = require('./routes/turmasRoutes');
// --- IMPORTAÇÃO DA NOVA ROTA ---
const materialRoutes = require('./routes/materialRoutes'); 
// routes/materiaisRoutes.js (ou seu arquivo de rotas)
const app = express();
console.log("CORS e Express carregados com sucesso!");

app.use(cors()); 
app.use(express.json()); 
app.use('/uploads', express.static('uploads'));

// Registra as rotas
app.use('/api/auth', authRoutes);
app.use('/api/unidades', unidadesRoutes);
app.use('/api/atividades', atividadesRoutes);
app.use('/api/boletim', boletimRoutes);
app.use('/api/comunicados', comunicadosRoutes);
app.use('/api/contatos', contatosRoutes);
app.use('/api/oportunidades', oportunidadesRoutes);
app.use('/api/atestados', AtestadoRoutes);
app.use('/api/uc', ucRoutes);
app.use('/api/documentos', documentosRoutes);
app.use('/api/desempenho', desempenhoRoutes); 
app.use('/api/contracheque', contrachequeRoutes); 
app.use('/api/turmas', turmasRoutes);
// --- REGISTRO DA NOVA ROTA ---
app.use('/api/materiais', materialRoutes); 


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`
    ====================================================
    🚀 PORTAL CONNECT - BACKEND INICIADO
    📡 Servidor rodando na porta: ${PORT}
    🔗 URL base: http://localhost:${PORT}
    ====================================================
    `);
});