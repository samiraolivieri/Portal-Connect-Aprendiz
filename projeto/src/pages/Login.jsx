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
      password: senha // 🔥 aqui precisa ser "password"
    });

    console.log("Resposta do backend:", resposta.data);
  } catch (erro) {
    console.log("Erro:", erro);
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