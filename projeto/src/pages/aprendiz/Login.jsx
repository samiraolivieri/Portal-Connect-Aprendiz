import "../../styles/login.css";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      console.log("ENVIANDO LOGIN:", {
        email,
        password: senha
      });
      
      const resposta = await axios.post("http://localhost:5000/api/auth/login", {
        email: email,
        password: senha
      });

      // --- AJUSTE IMPORTANTE ---
      // Salvamos o objeto do usuário completo. 
      // O Dashboard vai ler isso para mostrar o "OLÁ, NOME" e buscar o ID.
      localStorage.setItem("usuario", JSON.stringify(resposta.data.user));

      console.log("Login realizado!", resposta.data.user);

      // Redireciona baseado no nível de acesso
      const nivel = resposta.data.user.nivel;
      
      if (nivel === "aprendiz") {
        // Agora o Nivaldo ou Henrique serão redirecionados para o Dashboard que criamos
        window.location.href = "/dashboard";
      } else if (nivel === "gestor") {
        // Redireciona para a tela onde você faz o upload dos contracheques
        window.location.href = "/gestor/contracheque"; 
      } else if (nivel === "pedagogia") {
        window.location.href = "/pedagogo";
      }

    } catch (erro) {
      console.error("Erro detalhado:", erro);
      if (erro.response?.status === 401) {
        alert("E-mail ou senha incorretos!");
      } else {
        alert("Erro ao conectar com o servidor. Verifique se o Back-end está rodando.");
      }
    }
  };

  return (
    <div className="login-body">
      <img src="/logo3.png" alt="Logo" className="logo-top" />

      <div className="login-container">
        <h2>BEM-VINDO AO PORTAL</h2>

        <input
          className="input"
          placeholder="Email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          type="button"
          className="btn"
          onClick={handleLogin}
        >
          Entrar
        </button>

        <a href="#" className="forgot">Esqueceu a senha?</a>
      </div>
    </div>
  );
}