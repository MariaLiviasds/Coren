document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const n = document.getElementById("email").value.trim();
    const t = document.getElementById("senha").value;
    const a = document.getElementById("mensagem");
  
    a.innerHTML = "";
  
    if (!n.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      a.innerHTML = '<div class="alert alert-danger">E-mail inválido.</div>';
      return;
    }
  
    if (t.length < 6) {
      a.innerHTML = '<div class="alert alert-danger">Senha deve ter pelo menos 6 caracteres.</div>';
      return;
    }
  
    a.innerHTML = '<div class="alert alert-success">Login realizado com sucesso!</div>';
  
    const i = {
      email: n,
      senha: t
    };
  
    console.log("Dados enviados:", i);
  
    document.getElementById("loginForm").reset();
  });
  