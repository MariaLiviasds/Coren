document.addEventListener('DOMContentLoaded', () => {
  carregarStatus();
  document.getElementById('cadastroForm').addEventListener('submit', realizarCadastro);
});

async function carregarStatus() {
  try {
      const response = await fetch('http://localhost:3000/api/status');
      const data = await response.json();
      const mensagemDiv = document.getElementById('mensagem');
      mensagemDiv.textContent = `${data.mensagem} (Atualizado em: ${data.ultimaAtualizacao})`;
      mensagemDiv.className = 'alert alert-info';
      mensagemDiv.style.display = 'block';
  } catch (error) {
      console.error('Erro ao carregar status:', error);
      mostrarMensagem('Erro ao carregar status do sistema', 'alert alert-danger');
  }
}

async function realizarCadastro(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const cpf = document.getElementById('cpf').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  // Validação no front-end
  if (!nome || !email || !cpf || !senha || !confirmarSenha) {
      mostrarMensagem('Por favor, preencha todos os campos', 'alert alert-danger');
      return;
  }

  if (senha !== confirmarSenha) {
      mostrarMensagem('As senhas não coincidem', 'alert alert-danger');
      return;
  }

  try {
      const response = await fetch('http://localhost:3000/api/cadastro', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nome, email, cpf, senha })
      });

      const data = await response.json();

      if (response.ok) {
          mostrarMensagem(data.mensagem, 'alert alert-success');
          document.getElementById('cadastroForm').reset();
      } else {
          mostrarMensagem(data.erro, 'alert alert-danger');
      }
  } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      mostrarMensagem('Erro ao conectar com o servidor', 'alert alert-danger');
  }
}

function mostrarMensagem(texto, classe) {
  const mensagemDiv = document.getElementById('mensagem');
  mensagemDiv.textContent = texto;
  mensagemDiv.className = classe;
  mensagemDiv.style.display = 'block';
  setTimeout(() => {
      mensagemDiv.style.display = 'none';
  }, 5000);
}