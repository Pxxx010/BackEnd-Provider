const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

const userPushRoutes = require('./routes/usersPushRouter');
const usersRoutes = require('./routes/usersRoutes');
const chamadoRoutes = require('./routes/chamadosRoutes');
const historicoRoutes = require('./routes/historicoRoutes');

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

// Cadastro dos User
app.use('/api/admin', usersRoutes);

// Obter Informações
app.use('/api/user', userPushRoutes);
app.use('/api/chamado', chamadoRoutes);
app.use('/api/historico', historicoRoutes);

// Configuração da Porta
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
