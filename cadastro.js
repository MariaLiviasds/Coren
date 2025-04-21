// cadastro.js
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const mensagem = document.getElementById('mensagem');

    // Limpa mensagens anteriores
    mensagem.innerHTML = '';

    // Validações
    if (nome.length < 3) {
        mensagem.innerHTML = '<div class="alert alert-danger">Nome deve ter pelo menos 3 caracteres.</div>';
        return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        mensagem.innerHTML = '<div class="alert alert-danger">E-mail inválido.</div>';
        return;
    }

    const cpfLimpo = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpfLimpo.length !== 11 || !validarCPF(cpfLimpo)) {
        mensagem.innerHTML = '<div class="alert alert-danger">CPF inválido.</div>';
        return;
    }

    if (senha.length < 6) {
        mensagem.innerHTML = '<div class="alert alert-danger">Senha deve ter pelo menos 6 caracteres.</div>';
        return;
    }

    if (senha !== confirmarSenha) {
        mensagem.innerHTML = '<div class="alert alert-danger">As senhas não coincidem.</div>';
        return;
    }

    // Se todas as validações passarem
    mensagem.innerHTML = '<div class="alert alert-success">Cadastro realizado com sucesso!</div>';

    // Simula envio para uma API (você pode substituir por uma chamada real)
    const dados = { nome, email, cpf: cpfLimpo, senha };
    console.log('Dados enviados:', dados);

    // Opcional: Limpar o formulário
    document.getElementById('cadastroForm').reset();
});

// Função para validar CPF
function validarCPF(cpf) {
    let soma = 0;
    let resto;

    if (cpf === '00000000000') return false;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// Máscara para o CPF
document.getElementById('cpf').addEventListener('input', function(event) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    event.target.value = value;
});