const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

const userCoorRoutes = require('./routes/userCoorRoutes');
const coordenadorRoutes = require('./routes/coordenadorRoutes');
const tecnicoRoutes = require('./routes/tecnicoRoutes');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Conectar ao banco de dados
connectDB();

// Inicializar o aplicativo Express
const app = express();

// Middleware de segurança
app.use(helmet());

// Middleware para habilitar CORS
app.use(cors());

// Middleware para log de requisições
app.use(morgan('dev'));

// Middleware para parsing de JSON
app.use(express.json());

// Middleware para parsing de dados de formulários
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/admin', coordenadorRoutes);
app.use('/api/tecnico', tecnicoRoutes);
app.use('/api/admin/user', userCoorRoutes);

// Configuração da Porta
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
