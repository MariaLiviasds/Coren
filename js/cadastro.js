document.getElementById("cadastroForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const t = document.getElementById("nome").value.trim();
    const n = document.getElementById("email").value.trim();
    const r = document.getElementById("cpf").value.trim();
    const a = document.getElementById("senha").value;
    const d = document.getElementById("confirmarSenha").value;
    const l = document.getElementById("mensagem");
  
    l.innerHTML = "";
  
    if (t.length < 3) {
      l.innerHTML = '<div class="alert alert-danger">Nome deve ter pelo menos 3 caracteres.</div>';
      return;
    }
  
    if (!n.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      l.innerHTML = '<div class="alert alert-danger">E-mail inválido.</div>';
      return;
    }
  
    const i = r.replace(/\D/g, "");
  
    if (
      i.length !== 11 ||
      !function (e) {
        let t, n = 0;
  
        if (e === "00000000000") return false;
  
        for (let t = 1; t <= 9; t++) {
          n += parseInt(e.substring(t - 1, t)) * (11 - t);
        }
  
        t = (10 * n) % 11;
        if (t === 10 || t === 11) t = 0;
        if (t !== parseInt(e.substring(9, 10))) return false;
  
        n = 0;
        for (let t = 1; t <= 10; t++) {
          n += parseInt(e.substring(t - 1, t)) * (12 - t);
        }
  
        t = (10 * n) % 11;
        if (t === 10 || t === 11) t = 0;
        return t === parseInt(e.substring(10, 11));
      }(i)
    ) {
      l.innerHTML = '<div class="alert alert-danger">CPF inválido.</div>';
      return;
    }
  
    if (a.length < 6) {
      l.innerHTML = '<div class="alert alert-danger">Senha deve ter pelo menos 6 caracteres.</div>';
      return;
    }
  
    if (a !== d) {
      l.innerHTML = '<div class="alert alert-danger">As senhas não coincidem.</div>';
      return;
    }
  
    l.innerHTML = '<div class="alert alert-success">Cadastro realizado com sucesso!</div>';
  
    const s = {
      nome: t,
      email: n,
      cpf: i,
      senha: a
    };
  
    console.log("Dados enviados:", s);
    document.getElementById("cadastroForm").reset();
  });
  
  document.getElementById("cpf").addEventListener("input", function (e) {
    let t = e.target.value.replace(/\D/g, "");
  
    if (t.length > 11) t = t.slice(0, 11);
  
    t = t.replace(/(\d{3})(\d)/, "$1.$2");
    t = t.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    t = t.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  
    e.target.value = t;
  });
  