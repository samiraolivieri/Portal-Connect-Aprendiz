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

      // Salvamos o objeto do usuário completo
      localStorage.setItem("usuario", JSON.stringify(resposta.data.user));

      console.log("Login realizado!", resposta.data.user);

      // Redireciona baseado no nível de acesso
      const nivel = resposta.data.user.nivel;
      
      if (nivel === "aprendiz") {
        window.location.href = "/dashboard";
      } 
      else if (nivel === "gestor") {
        // CORREÇÃO: Agora redireciona para o Dashboard do Gestor
        window.location.href = "/gestor/dashboard"; 
      } 
      else if (nivel === "pedagogia" || nivel === "pedagogo") {
        // CORREÇÃO: Redireciona para a rota correta definida no seu App.jsx
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