const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// 1. IMPORTAÇÃO DAS ROTAS (Baseado na sua estrutura de pastas)
const authRoutes = require('./routes/authRoutes');
const atividadesRoutes = require('./routes/atividadesRoutes');
const boletimRoutes = require('./routes/boletimRoutes');
const comunicadosRoutes = require('./routes/comunicadosRoutes');
const contatosRoutes = require('./routes/contatosRoutes');
const oportunidadesRoutes = require('./routes/oportunidadesRoutes');

const app = express();

app.use(cors()); // Permite que seu React (front) acesse o Node (back)
app.use(express.json()); // Permite ler JSON enviado no corpo da requisição

// Registra as rotas
app.use('/api/auth', authRoutes);

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
//TESTANDO GITHUB