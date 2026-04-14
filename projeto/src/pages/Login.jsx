import "../styles/login.css";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const resposta = await axios.post("http://localhost:5000/api/auth/login", {
        email: email,
        password: senha
      });

      // Salva os dados do usuário no localStorage
      localStorage.setItem("usuario", JSON.stringify(resposta.data.user));

      console.log("Login realizado!", resposta.data.user);

      // Redireciona baseado no nivel 
      const nivel = resposta.data.user.nivel;
      if (nivel === "aprendiz") {
        window.location.href = "/";
      } else if (nivel === "gestor") {
        window.location.href = "/dashboard-gestor";
      } else if (nivel === "pedagogia") {
        window.location.href = "/dashboard-pedagogia";
      }

    } catch (erro) {
      if (erro.response?.status === 401) {
        alert("E-mail ou senha incorretos!");
      } else {
        alert("Erro ao conectar com o servidor.");
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="btn" onClick={handleLogin}>
          Entrar
        </button>

        <a href="#" className="forgot">Esqueceu a senha?</a>
      </div>

    </div>
  );
}