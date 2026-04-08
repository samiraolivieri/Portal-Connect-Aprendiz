const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. IMPORTAÇÃO DAS ROTAS (Baseado na sua estrutura de pastas)
const authRoutes = require('./routes/authRoutes');
const atividadesRoutes = require('./routes/atividadesRoutes');
const boletimRoutes = require('./routes/boletimRoutes');
const comunicadosRoutes = require('./routes/comunicadosRoutes');
const contatosRoutes = require('./routes/contatosRoutes');
const oportunidadesRoutes = require('./routes/oportunidadesRoutes');

const app = express();

// 2. MIDDLEWARES
// Permite que o seu React (Frontend) acesse este Backend
app.use(cors()); 
// Permite que o servidor entenda quando você envia dados em formato JSON
app.use(express.json()); 

// 3. REGISTRO DAS ROTAS (Onde a "Triangulação" acontece)
// Cada comando abaixo liga uma URL do navegador a um arquivo de rota
app.use('/api/auth', authRoutes);               // Login e Segurança (BCRYPT)
app.use('/api/atividades', atividadesRoutes);   // Cards de Atividades Pendentes
app.use('/api/boletim', boletimRoutes);         // Notas e Faltas (Resumo Acadêmico)
app.use('/api/comunicados', comunicadosRoutes); // Mural de Avisos do SENAI/Empresa
app.use('/api/contatos', contatosRoutes);       // Pop-up de contato com gestores
app.use('/api/oportunidades', oportunidadesRoutes); // Portal Carreiras (Vagas e Efetivação)

// 4. ROTA DE TESTE (Para saber se o servidor está vivo)
app.get('/', (req, res) => {
    res.send('🚀 Backend do Portal Connect operando com sucesso!');
});

// 5. INICIALIZAÇÃO DO SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
    ====================================================
    🚀 PORTAL CONNECT - BACKEND INICIADO
    📡 Servidor rodando na porta: ${PORT}
    🔗 URL base: http://localhost:${PORT}
    ====================================================
    `);
});