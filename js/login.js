document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  if (form) {
      form.addEventListener('submit', (e) => {
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          if (!email || !password) {
              e.preventDefault();
              alert('Preencha todos os campos!');
          }
      });
  }

  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/js/service-worker.js')
          .then(reg => console.log('Service Worker registrado', reg))
          .catch(err => console.error('Erro ao registrar Service Worker', err));
  }
});
  