import React, { useState } from "react"; // Importação completa para evitar erros de referência
import "../../styles/login.css";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      console.log("ENVIANDO LOGIN:", { email, password: senha });
      
      const resposta = await axios.post("http://localhost:5000/api/auth/login", {
        email: email,
        password: senha
      });

      // Salvamos o objeto do usuário completo no localStorage para usar no Portal Connect
      localStorage.setItem("usuario", JSON.stringify(resposta.data.user));
      console.log("Login realizado!", resposta.data.user);

      const nivel = resposta.data.user.nivel;
      
      // LÓGICA DE REDIRECIONAMENTO AJUSTADA
      if (nivel === "aprendiz") {
        window.location.href = "/dashboard";
      } 
      else if (nivel === "gestor") {
        window.location.href = "/gestor/dashboard"; 
      } 
      else if (nivel === "pedagogia" || nivel === "pedagogo") {
        // CORREÇÃO: Agora redireciona para a rota correta que você definiu no App.jsx
        window.location.href = "/pedagogo"; 
      }
      else {
        alert("Nível de acesso não reconhecido.");
      }

    } catch (erro) {
      console.error("Erro detalhado:", erro);
      if (erro.response?.status === 401) {
        alert("E-mail ou senha incorretos!");
      } else {
        alert("Erro ao conectar com o servidor. Verifique o Back-end.");
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
        <button type="button" className="btn" onClick={handleLogin}>
          Entrar
        </button>
        <a href="#" className="forgot">Esqueceu a senha?</a>
      </div>
    </div>
  );
}