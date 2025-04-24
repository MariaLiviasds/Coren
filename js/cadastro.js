document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (nome && email && password) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '/login.html';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});