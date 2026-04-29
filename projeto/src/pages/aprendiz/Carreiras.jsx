
import { useState, useEffect } from "react";
import "../../styles/carreiras.css";

export default function Carreiras() {
  const [modal, setModal] = useState("");
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/oportunidades")
      .then((res) => res.json())
      .then((data) => setVagas(data))
      .catch((error) => console.log("Erro:", error));
  }, []);

  return (
    <div className="carreiras-container">
      <h1 className="titulo">Portal Carreiras</h1>

      {/* Hero */}
      <div className="hero">
        <div>
          <h2>Construa seu futuro profissional 🚀</h2>
          <p>Vagas, cursos e eventos em um só lugar.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card" onClick={() => setModal("vagas")}>
          <h3>6</h3>
          <p>Vagas Abertas</p>
        </div>

        <div className="stat-card" onClick={() => setModal("cursos")}>
          <h3>8</h3>
          <p>Cursos Disponíveis</p>
        </div>

        <div className="stat-card" onClick={() => setModal("eventos")}>
          <h3>2</h3>
          <p>Eventos</p>
        </div>
      </div>

      {/* Vagas */}
      <div className="section">
        <h2>💼 Últimas Oportunidades</h2>

        <div className="grid">
          <div className="item-card">
            <h3>Jovem Aprendiz</h3>
            <p>Firjan • RJ</p>
          </div>

          <div className="item-card">
            <h3>Estágio TI</h3>
            <p>Globo • RJ</p>
          </div>

          <div className="item-card">
            <h3>Assistente ADM</h3>
            <p>Home Office</p>
          </div>
          {vagas.map((vaga) => (
      <div className="item-card" key={vaga.id}>
        <h3>{vaga.titulo}</h3>
        <p>{vaga.empresa}</p>
      </div>
    ))}
        </div>
      </div>

      {/* Cursos */}
      <div className="section">
        <h2>🎓 Cursos em Destaque</h2>

        <div className="grid">
          <div className="item-card">Excel Básico</div>
          <div className="item-card">Power BI</div>
          <div className="item-card">Programação Web</div>
        </div>
      </div>

      {/* Eventos */}
      <div className="section">
        <h2>📅 Próximos Eventos</h2>

        <div className="event">Feira de Estágio - 20/04</div>
        <div className="event">Workshop LinkedIn - 25/04</div>
      </div>

      {/* POPUP */}
      {modal && (
        <div className="overlay" onClick={() => setModal("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="fechar" onClick={() => setModal("")}>
              X
            </button>

            {modal === "vagas" && (
  <>
    <h2>💼 Vagas Abertas</h2>

    <div className="curso-item">
      <p>Jovem Aprendiz - Firjan</p>
      <a
        href="https://www.linkedin.com/jobs/"
        target="_blank"
        rel="noreferrer"
        className="btn-link"
      >
        Candidatar-se
      </a>
    </div>

    <div className="curso-item">
      <p>Estágio TI - Globo</p>
      <a
        href="https://www.gupy.io/"
        target="_blank"
        rel="noreferrer"
        className="btn-link"
      >
        Candidatar-se
      </a>
    </div>

    <div className="curso-item">
      <p>Assistente ADM - Home Office</p>
      <a
        href="https://www.infojobs.com.br/"
        target="_blank"
        rel="noreferrer"
        className="btn-link"
      >
        Candidatar-se
      </a>
    </div>
    <div className="curso-item">
  <p>Auxiliar Administrativo - SENAI</p>
  <a
    href="https://www.firjan.com.br/"
    target="_blank"
    rel="noreferrer"
    className="btn-link"
  >
    Candidatar-se
  </a>
</div>

<div className="curso-item">
  <p>Jovem Aprendiz em Logística - SENAI</p>
  <a
    href="https://www.firjan.com.br/"
    target="_blank"
    rel="noreferrer"
    className="btn-link"
  >
    Candidatar-se
  </a>
</div>

<div className="curso-item">
  <p>Estágio em Suporte Técnico - SENAI</p>
  <a
    href="https://www.firjan.com.br/"
    target="_blank"
    rel="noreferrer"
    className="btn-link"
  >
    Candidatar-se
  </a>
</div>
  </>
)}

{modal === "cursos" && (
  <>
    <h2>🎓 Cursos Disponíveis</h2>

    <div className="curso-item">
      <p>Excel Básico</p>
      <a
        href="https://www.ev.org.br/"
        target="_blank"
        rel="noreferrer"
        className="btn-link"
      >
        Inscrever-se
      </a>
    </div>

    <div className="curso-item">
      <p>Power BI</p>
      <a
        href="https://www.coursera.org/"
        target="_blank"
        rel="noreferrer"
        className="btn-link"
      >
        Inscrever-se
      </a>
    </div>

    <div className="curso-item">
      <p>Programação Web</p>
      <a
        href="https://www.udemy.com/"
        target="_blank"
        rel="noreferrer"
        className="btn-link"
      >
        Inscrever-se
      </a>
    </div>
    <div className="curso-item">
  <p>Marketing Digital</p>
  <a
    href="https://www.coursera.org/"
    target="_blank"
    rel="noreferrer"
    className="btn-link"
  >
    Inscrever-se
  </a>
</div>

<div className="curso-item">
  <p>Informática Básica</p>
  <a
    href="https://www.ev.org.br/"
    target="_blank"
    rel="noreferrer"
    className="btn-link"
  >
    Inscrever-se
  </a>
</div>

<div className="curso-item">
  <p>Design Gráfico</p>
  <a
    href="https://www.udemy.com/"
    target="_blank"
    rel="noreferrer"
    className="btn-link"
  >
    Inscrever-se
  </a>
</div>

<div className="curso-item">
  <p>Atendimento ao Cliente</p>
  <a
    href="https://www.sebrae.com.br/"
    target="_blank"
    rel="noreferrer"
    className="btn-link"
  >
    Inscrever-se
  </a>
</div>

<div className="curso-item">
  <p>Inglês para Iniciantes</p>
  <a
    href="https://www.duolingo.com/"
    target="_blank"
    rel="noreferrer"
    className="btn-link"
  >
    Inscrever-se
  </a>
</div>
  </>
)}

            {modal === "eventos" && (
              <>
                <h2>📅 Próximos Eventos</h2>
                <p>Feira de Estágio - 20/04</p>
                <p>Workshop LinkedIn - 25/04</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}