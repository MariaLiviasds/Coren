document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (!name || !email || !password) {
                e.preventDefault();
                alert('Preencha todos os campos!');
            }
        });
    }
});