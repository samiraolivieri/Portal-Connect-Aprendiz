const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// 1. IMPORTAÇÃO DAS ROTAS
const authRoutes = require('./routes/authRoutes');
const unidadesRoutes = require('./routes/unidadesRoutes');
const atividadesRoutes = require('./routes/atividadesRoutes');
const boletimRoutes = require('./routes/boletimRoutes');
const comunicadosRoutes = require('./routes/comunicadosRoutes');
const contatosRoutes = require('./routes/contatosRoutes');
const oportunidadesRoutes = require('./routes/oportunidadesRoutes');
const AtestadoRoutes = require('./routes/AtestadoRoutes');
const ucRoutes = require('./routes/ucRoutes');
const documentosRoutes = require('./routes/documentosRoutes');
const pedagogoRoutes = require("./routes/pedagogoRoutes");
const visitaRoutes = require('./routes/visitaRoutes');
const desempenhoRoutes = require('./routes/desempenhoRoutes');
const contrachequeRoutes = require('./routes/contrachequeRoutes'); 
const turmasRoutes = require('./routes/turmasRoutes');
const materialRoutes = require('./routes/materialRoutes'); 


const app = express();

// 2. MIDDLEWARES
app.use(cors()); 
app.use(express.json()); 

// 3. CONFIGURAÇÃO DE ARQUIVOS ESTÁTICOS (CORRIGIDA)
// path.resolve garante que o Express encontre a pasta uploads na raiz, 
// mesmo que o servidor seja iniciado de dentro da pasta /src
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// 4. REGISTRO DAS ROTAS DA API
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
app.use('/api/materiais', materialRoutes); 
app.use('/api/visitas', visitaRoutes);
app.use('/api/pedagogo', pedagogoRoutes);

// 5. INICIALIZAÇÃO DO SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
    ====================================================
    🚀 PORTAL CONNECT - BACKEND INICIADO
    📡 Servidor rodando na porta: ${PORT}
    🔗 URL base: http://localhost:${PORT}
    📂 Uploads: ${path.resolve(__dirname, '..', 'uploads')}
    ====================================================
    `);
});
