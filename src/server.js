const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

app.use(cors()); // Permite que seu React (front) acesse o Node (back)
app.use(express.json()); // Permite ler JSON enviado no corpo da requisição

// Registra as rotas
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Portal Connect rodando na porta ${PORT}`);
});