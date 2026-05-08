import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaFileDownload } from 'react-icons/fa';
import "../../styles/carreiras.css";

export default function Carreiras() {
  const [modal, setModal] = useState("");
  const [vagas, setVagas] = useState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { nome: 'Aprendiz', nivel: 'aprendiz' };
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };


  // Busca vagas do back-end
  useEffect(() => {
    fetch("http://localhost:5000/api/oportunidades")
      .then((res) => res.json())
      .then((data) => setVagas(data))
      .catch((error) => console.log("Erro ao carregar vagas:", error));
  }, []);

  
    return (
    <div className="carreiras-container">
      
      {/* NOVO BLOCO ENVOLVENDO O TÍTULO E O PERFIL NA MESMA LINHA */}
      <div className="justificativas-header">
        <h1 className="titulo">Portal Carreiras</h1>

        <div className="header-icons">
          <div className="icon-wrapper" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ cursor: 'pointer', position: 'relative' }}>
            <FaUserCircle />
            {isMenuOpen && (
              <div className="dropdown-popup">
                <div className="user-info-header">
                  <strong>{usuarioLogado.nome}</strong>
                  <span>{usuarioLogado.nivel === 'aprendiz' ? 'Aprendiz' : usuarioLogado.nivel} - Petrobras</span>
                </div>
                <ul>
                  <li className="logout-opt" onClick={handleLogout}>Sair do Sistema</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section e restante do código continuam perfeitamente iguais abaixo... */}
      <div className="hero">
        <div>
          <h2>Construa seu futuro profissional 🚀</h2>
          <p>Vagas, cursos e eventos em um só lugar.</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <div>
          <h2>Construa seu futuro profissional 🚀</h2>
          <p>Vagas, cursos e eventos em um só lugar.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats">
        <div className="stat-card" onClick={() => setModal("vagas")}>
          <h3>{3 + vagas.length}</h3> {/* Soma as estáticas + dinâmicas */}
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

      {/* Seção de Vagas */}
      <div className="section">
        <h2>💼 Últimas Oportunidades</h2>
        <div className="grid">
          {/* Vagas Estáticas */}
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
        <div className="grid">
          <div className="item-card">Excel Básico</div>
          <div className="item-card">Power BI</div>
          <div className="item-card">Programação Web</div>
        </div>
      </div>

      {/* Seção de Eventos */}
      <div className="section">
        <h2>📅 Próximos Eventos</h2>
        <div className="event">Feira de Estágio - 20/04</div>
        <div className="event">Workshop LinkedIn - 25/04</div>
      </div>

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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
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
}