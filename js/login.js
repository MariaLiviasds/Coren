document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (email && password) {
            alert('Login realizado com sucesso!');
            window.location.href = '/index.html';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});