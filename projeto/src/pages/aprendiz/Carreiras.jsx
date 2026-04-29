<<<<<<< HEAD
=======

>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
import { useState, useEffect } from "react";
import "../../styles/carreiras.css";

export default function Carreiras() {
  const [modal, setModal] = useState("");
  const [vagas, setVagas] = useState([]);

<<<<<<< HEAD
  // Busca vagas do back-end
=======
>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
  useEffect(() => {
    fetch("http://localhost:5000/api/oportunidades")
      .then((res) => res.json())
      .then((data) => setVagas(data))
<<<<<<< HEAD
      .catch((error) => console.log("Erro ao carregar vagas:", error));
=======
      .catch((error) => console.log("Erro:", error));
>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
  }, []);

  return (
    <div className="carreiras-container">
      <h1 className="titulo">Portal Carreiras</h1>

<<<<<<< HEAD
      {/* Hero Section */}
=======
      {/* Hero */}
>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
      <div className="hero">
        <div>
          <h2>Construa seu futuro profissional 🚀</h2>
          <p>Vagas, cursos e eventos em um só lugar.</p>
        </div>
      </div>

<<<<<<< HEAD
      {/* Stats Cards */}
      <div className="stats">
        <div className="stat-card" onClick={() => setModal("vagas")}>
          <h3>{3 + vagas.length}</h3> {/* Soma as estáticas + dinâmicas */}
=======
      {/* Stats */}
      <div className="stats">
        <div className="stat-card" onClick={() => setModal("vagas")}>
          <h3>6</h3>
>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
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

<<<<<<< HEAD
      {/* Seção de Vagas */}
      <div className="section">
        <h2>💼 Últimas Oportunidades</h2>
        <div className="grid">
          {/* Vagas Estáticas */}
=======
      {/* Vagas */}
      <div className="section">
        <h2>💼 Últimas Oportunidades</h2>

        <div className="grid">
>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
          <div className="item-card">
            <h3>Jovem Aprendiz</h3>
            <p>Firjan • RJ</p>
          </div>
<<<<<<< HEAD
=======

>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
          <div className="item-card">
            <h3>Estágio TI</h3>
            <p>Globo • RJ</p>
          </div>
<<<<<<< HEAD
=======

>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
          <div className="item-card">
            <h3>Assistente ADM</h3>
            <p>Home Office</p>
          </div>
<<<<<<< HEAD

          {/* Vagas vindas do Back-end */}
          {vagas.map((vaga) => (
            <div className="item-card" key={vaga.id}>
              <h3>{vaga.titulo}</h3>
              <p>{vaga.empresa || "Empresa parceira"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Cursos */}
      <div className="section">
        <h2>🎓 Cursos em Destaque</h2>
=======
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

>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
        <div className="grid">
          <div className="item-card">Excel Básico</div>
          <div className="item-card">Power BI</div>
          <div className="item-card">Programação Web</div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Seção de Eventos */}
      <div className="section">
        <h2>📅 Próximos Eventos</h2>
=======
      {/* Eventos */}
      <div className="section">
        <h2>📅 Próximos Eventos</h2>

>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
        <div className="event">Feira de Estágio - 20/04</div>
        <div className="event">Workshop LinkedIn - 25/04</div>
      </div>

<<<<<<< HEAD
      {/* --- MODAL / POPUP --- */}
      {modal && (
        <div className="overlay" onClick={() => setModal("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="fechar" onClick={() => setModal("")}>X</button>

            {/* Conteúdo Modal VAGAS */}
            {modal === "vagas" && (
              <>
                <h2>💼 Vagas Abertas</h2>
                <div className="modal-scroll-area">
                  <VagaItem titulo="Jovem Aprendiz - Firjan" link="https://www.linkedin.com/jobs/" />
                  <VagaItem titulo="Estágio TI - Globo" link="https://www.gupy.io/" />
                  <VagaItem titulo="Assistente ADM - Home Office" link="https://www.infojobs.com.br/" />
                  <VagaItem titulo="Auxiliar Administrativo - SENAI" link="https://www.firjan.com.br/" />
                  <VagaItem titulo="Jovem Aprendiz em Logística - SENAI" link="https://www.firjan.com.br/" />
                  <VagaItem titulo="Estágio em Suporte Técnico - SENAI" link="https://www.firjan.com.br/" />
                  
                  {/* Vagas dinâmicas no Modal */}
                  {vagas.map(vaga => (
                    <VagaItem key={vaga.id} titulo={`${vaga.titulo} - ${vaga.empresa}`} link={vaga.link_externo || "#"} />
                  ))}
                </div>
              </>
            )}

            {/* Conteúdo Modal CURSOS */}
            {modal === "cursos" && (
              <>
                <h2>🎓 Cursos Disponíveis</h2>
                <div className="modal-scroll-area">
                  <CursoItem titulo="Excel Básico" link="https://www.ev.org.br/" />
                  <CursoItem titulo="Power BI" link="https://www.coursera.org/" />
                  <CursoItem titulo="Programação Web" link="https://www.udemy.com/" />
                  <CursoItem titulo="Marketing Digital" link="https://www.coursera.org/" />
                  <CursoItem titulo="Informática Básica" link="https://www.ev.org.br/" />
                  <CursoItem titulo="Design Gráfico" link="https://www.udemy.com/" />
                  <CursoItem titulo="Atendimento ao Cliente" link="https://www.sebrae.com.br/" />
                  <CursoItem titulo="Inglês para Iniciantes" link="https://www.duolingo.com/" />
                </div>
              </>
            )}

            {/* Conteúdo Modal EVENTOS */}
            {modal === "eventos" && (
              <>
                <h2>📅 Próximos Eventos</h2>
                <div className="curso-item"><p>Feira de Estágio - 20/04</p></div>
                <div className="curso-item"><p>Workshop LinkedIn - 25/04</p></div>
=======
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
>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
<<<<<<< HEAD
}

// Sub-componentes para limpar o código principal
function VagaItem({ titulo, link }) {
  return (
    <div className="curso-item">
      <p>{titulo}</p>
      <a href={link} target="_blank" rel="noreferrer" className="btn-link">Candidatar-se</a>
    </div>
  );
}

function CursoItem({ titulo, link }) {
  return (
    <div className="curso-item">
      <p>{titulo}</p>
      <a href={link} target="_blank" rel="noreferrer" className="btn-link">Inscrever-se</a>
    </div>
  );
=======
>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
}