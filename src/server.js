const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// 1. IMPORTAÇÃO DAS ROTAS (Baseado na sua estrutura de pastas)
const AtestadoRoutes = require('./routes/AtestadoRoutes')
const atividadesRoutes = require('./routes/atividadesRoutes');
const boletimRoutes = require('./routes/boletimRoutes');
const comunicadosRoutes = require('./routes/comunicadosRoutes');
const contatosRoutes = require('./routes/contatosRoutes');
const oportunidadesRoutes = require('./routes/oportunidadesRoutes');
const ucRoutes = require('./routes/ucRoutes');
const authRoutes = require('./routes/authRoutes');
const unidadesRoutes = require('./routes/unidadesRoutes');
const documentosRoutes = require('./routes/documentosRoutes');

const app = express();
console.log("CORS e Express carregados com sucesso!");

app.use(cors()); // Permite que seu React (front) acesse o Node (back)
app.use(express.json()); // Permite ler JSON enviado no corpo da requisição

// Registra as rotas
// Cada rota precisa de um "caminho" de API
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
//Deixa a pasta upploasd publica
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
