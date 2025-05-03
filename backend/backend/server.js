const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Lista estática de CPFs pré-cadastrados (dados mockados)
const cpfsAutorizados = [
    '12345678901',
    '98765432100',
    '11122233344'
];

// Lista de cadastros realizados
let cadastros = [];

// Endpoint GET para retornar dados estáticos (atende ao professor)
app.get('/api/status', (req, res) => {
    res.json({ mensagem: 'Sistema COREN-PE: Cadastro online ativo', ultimaAtualizacao: '2025-05-03' });
});

// Endpoint POST para validar e realizar cadastro
app.post('/api/cadastro', (req, res) => {
    const { nome, email, cpf, senha } = req.body;

    // Validação básica
    if (!nome || !email || !cpf || !senha) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    // Verifica se o CPF está na lista de autorizados
    if (!cpfsAutorizados.includes(cpf)) {
        return res.status(403).json({ erro: 'CPF não autorizado para cadastro' });
    }

    // Verifica se o CPF ou email já foi cadastrado
    if (cadastros.some(cadastro => cadastro.cpf === cpf)) {
        return res.status(400).json({ erro: 'CPF já cadastrado' });
    }
    if (cadastros.some(cadastro => cadastro.email === email)) {
        return res.status(400).json({ erro: 'E-mail já cadastrado' });
    }

    // Registra o cadastro
    cadastros.push({ nome, email, cpf, senha });
    res.status(201).json({ mensagem: `Cadastro realizado com sucesso para ${nome}` });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});