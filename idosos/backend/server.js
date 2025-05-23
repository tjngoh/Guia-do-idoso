const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Configuração do servidor
const app = express();
const PORT = 3000;

// Conectando ao MongoDB com nome de banco definido (feedbacksdb)
mongoose.connect(
  'mongodb+srv://admin:Admin12345678@interdisplinar.ocegq2k.mongodb.net/feedbacksdb?retryWrites=true&w=majority&appName=Interdisplinar',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
)
.then(() => console.log('✅ Conectado ao MongoDB: banco "feedbacksdb"'))
.catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Verifica qual banco está em uso
mongoose.connection.on('connected', () => {
  console.log('🔎 Banco em uso:', mongoose.connection.name);
});

// Modelo de Feedback
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idade: { type: Number, required: true, min: 1, max: 100 },
  message: { type: String, required: true, minlength: 3 },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Middlewares
app.use(cors());
app.use(express.json());

// Rota para receber feedbacks
app.post('/api/feedback', async (req, res) => {
  console.log('📥 Dados recebidos do front-end:', req.body);

  const { name, idade, message } = req.body;

  // Validação básica
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: 'O nome é obrigatório.' });
  }

  if (!idade || isNaN(idade) || idade < 18 || idade > 100) {
    return res.status(400).json({ error: 'A idade deve estar entre 18 e 100 anos.' });
  }

  if (!message || typeof message !== "string" || message.trim().length < 3) {
    return res.status(400).json({ error: 'A mensagem deve conter pelo menos 3 caracteres.' });
  }

  try {
    const novoFeedback = new Feedback({
      name: name.trim(),
      idade,
      message: message.trim(),
    });

    const resultado = await novoFeedback.save();
    console.log("✅ Feedback salvo no MongoDB:", resultado);

    res.status(201).json({ message: "Feedback salvo com sucesso" });
  } catch (err) {
    console.error('❌ Erro ao salvar feedback no MongoDB:', err);
    res.status(500).json({ error: 'Erro ao salvar feedback no banco de dados.' });
  }
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
