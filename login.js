document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');

    // Limpa mensagens anteriores
    mensagem.innerHTML = '';

    // Validações
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        mensagem.innerHTML = '<div class="alert alert-danger">E-mail inválido.</div>';
        return;
    }

    if (senha.length < 6) {
        mensagem.innerHTML = '<div class="alert alert-danger">Senha deve ter pelo menos 6 caracteres.</div>';
        return;
    }

    // Se todas as validações passarem
    mensagem.innerHTML = '<div class="alert alert-success">Login realizado com sucesso!</div>';

    // Simula envio para uma API (você pode substituir por uma chamada real)
    const dados = { email, senha };
    console.log('Dados enviados:', dados);

    // Opcional: Limpar o formulário
    document.getElementById('loginForm').reset();
});