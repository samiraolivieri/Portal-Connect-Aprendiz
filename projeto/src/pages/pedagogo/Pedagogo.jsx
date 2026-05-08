import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./pedagogo.css";
import axios from 'axios';
import { 
  FaBullhorn, 
  FaUserGraduate, 
  FaChartLine, 
  FaBook, 
  FaSearch, 
  FaClipboardList,
  FaComments,
  FaTimes,
  FaEnvelope,
  FaUserTie,
  FaUsers,
  FaUserCircle 
} from "react-icons/fa";

export default function Pedagogo() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estados para controle de Modais
  const [abrirComunicado, setAbrirComunicado] = useState(false);
  const [abrirMaterial, setAbrirMaterial] = useState(false);
  const [abrirPendencias, setAbrirPendencias] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Estados de Dados
  const [justificativas, setJustificativas] = useState([]);
  const [comunicados, setComunicados] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [resultadoBusca, setResultadoBusca] = useState([]);
  const [busca, setBusca] = useState("");
  const [aprendizesContatos, setAprendizesContatos] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    alunos: 0,
    presenca: 0,
    materiais: 0
  });

  const contatoGestor = { 
    nome: "Sérgio Carvalho", 
    email: "sergio.carvalho@petrobras.com.br", 
    tel: "(21) 99999-7777" 
  };

  const [tituloMaterial, setTituloMaterial] = useState("");
  const [descricaoMaterial, setDescricaoMaterial] = useState("");
  const [linkMaterial, setLinkMaterial] = useState("");
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { id: 0, nome: 'Pedagogo', nivel: 'pedagogo' };
  const turmaId = usuarioLogado?.turma_id;
  const nomeExibicao = usuarioLogado ? usuarioLogado.nome : "Pedagogo(a)";

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const carregarDadosIniciais = async () => {
    try {
      const resJust = await fetch(`http://localhost:5000/api/pedagogo/justificativas?turma_id=${turmaId}`);
      setJustificativas(await resJust.json());

      const resCom = await fetch("http://localhost:5000/api/pedagogo/comunicados");
      setComunicados(await resCom.json());

      const resEst = await fetch(`http://localhost:5000/api/pedagogo/estatisticas?turma_id=${turmaId}`);
      setEstatisticas(await resEst.json());

      const resMat = await fetch(`http://localhost:5000/api/pedagogo/materiais?turma_id=${turmaId}`);
      setMateriais(await resMat.json());

      const resContatos = await axios.get("http://localhost:5000/api/turmas/dados/lancamento");
      const listaFinal = resContatos.data.alunos || (Array.isArray(resContatos.data) ? resContatos.data : []);
      setAprendizesContatos(listaFinal);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  };

  useEffect(() => {
    if (!turmaId) return;
    carregarDadosIniciais();
  }, [turmaId]);

  const buscarAluno = async (valor) => {
    setBusca(valor);
    if (valor.trim() === "") {
      setResultadoBusca([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/pedagogo/buscar/${valor}?turma_id=${turmaId}`);
      const data = await res.json();
      setResultadoBusca(data);
    } catch (err) { console.error(err); }
  };

  const publicarComunicado = async () => {
    try {
      await fetch("http://localhost:5000/api/pedagogo/comunicado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, conteudo, autor_id: usuarioLogado?.id })
      });
      setAbrirComunicado(false); setTitulo(""); setConteudo(""); carregarDadosIniciais();
    } catch (err) { console.error(err); }
  };

  const publicarMaterial = async () => {
    try {
      await fetch("http://localhost:5000/api/pedagogo/materiais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: tituloMaterial, descricao: descricaoMaterial, link_material: linkMaterial, turma_id: turmaId })
      });
      setTituloMaterial(""); setDescricaoMaterial(""); setLinkMaterial(""); setAbrirMaterial(false); carregarDadosIniciais();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="pedagogo">
      {/* ✅ HEADER COM PERFIL À DIREITA */}
      <header className="topo-pedagogo">
        <h1><FaUserGraduate /> Olá, {nomeExibicao}!</h1>
        
        <div className="header-icons">
          <div className="icon-wrapper" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaUserCircle size={40} />
            {isMenuOpen && (
              <div className="dropdown-popup">
                <div className="user-info-header">
                  <strong>{usuarioLogado.nome}</strong>
                  <span>{usuarioLogado.nivel === 'pedagogia' ? 'Pedagogia' : usuarioLogado.nivel} - Petrobras</span>
                </div>
                <ul>
                  <li className="logout-opt" onClick={handleLogout}>Sair do Sistema</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="main">
        <div className="content">
          
          {/* ✅ CARDS LADO A LADO: BUSCA E JUSTIFICATIVA */}
          <div className="container-topo-cards">
            <div className="box busca-box">
              <h3><FaSearch /> Buscar Aprendiz</h3>
              <input
                type="text"
                placeholder="Digite o nome do aluno..."
                className="inputBusca"
                value={busca}
                onChange={(e) => buscarAluno(e.target.value)}
              />
              <div className="resultadoBusca">
                {resultadoBusca.map((aluno) => (
                  <div key={aluno.id} className="itemBusca">👤 {aluno.nome}</div>
                ))}
              </div>
            </div>

            <div className="painelAcao">
              <h3><FaClipboardList /> VALIDAR JUSTIFICATIVA</h3>
              <p style={{ fontSize: "12px", color: "#666" }}>Clique para visualizar pendências</p>
              <button className="botaoSecundario" onClick={() => setAbrirPendencias(true)}>
                VER PENDÊNCIAS ({justificativas.length})
              </button>
            </div>
          </div>

          {/* GRID DASHBOARD */}
          <div className="dashboard-grid">
            <div className="box">
              <h3><FaBullhorn /> Comunicados</h3>
              <div className="lista-scroll">
                {comunicados.map((c, i) => (
                  <div key={i} className="item-lista">
                    <p><strong>{c.titulo}</strong></p>
                    <p>{c.conteudo}</p>
                  </div>
                ))}
              </div>
              <button className="miniBtn" onClick={() => setAbrirComunicado(true)}>Novo comunicado</button>
            </div>

            <div className="box">
              <h3><FaChartLine /> Estatísticas</h3>
              <div className="stats-info">
                <p>👥 Alunos: <strong>{estatisticas.alunos || 0}</strong></p>
                <p>📈 Presença: <strong>{estatisticas.presenca ? Number(estatisticas.presenca).toFixed(1) : 0}%</strong></p>
                <p>📚 Materiais: <strong>{estatisticas.materiais || 0}</strong></p>
              </div>
            </div>

            <div className="box">
              <h3><FaBook /> Materiais</h3>
              <div className="lista-scroll">
                {materiais.map((m) => (
                  <div key={m.id} className="item-lista"><p>{m.titulo}</p></div>
                ))}
              </div>
              <button className="miniBtn" onClick={() => setAbrirMaterial(true)}>Publicar material</button>
            </div>
          </div>
        </div>
      </div>

     {/* MODAIS */}

      {abrirComunicado && (

        <div className="overlay">

          <div className="modal">

            <h2>Novo Comunicado</h2>

            <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

            <textarea placeholder="Conteúdo" value={conteudo} onChange={(e) => setConteudo(e.target.value)} />

            <div className="acoesModal">

              <button className="fecharBtn" onClick={() => setAbrirComunicado(false)}>Cancelar</button>

              <button className="miniBtn" onClick={publicarComunicado}>Publicar</button>

            </div>

          </div>

        </div>

      )}



      {abrirMaterial && (

        <div className="overlay">

          <div className="modal">

            <h2>Novo Material</h2>

            <input type="text" placeholder="Título" value={tituloMaterial} onChange={(e) => setTituloMaterial(e.target.value)} />

            <textarea placeholder="Descrição" value={descricaoMaterial} onChange={(e) => setDescricaoMaterial(e.target.value)} />

            <input type="text" placeholder="Link do material" value={linkMaterial} onChange={(e) => setLinkMaterial(e.target.value)} />

            <div className="acoesModal">

              <button className="fecharBtn" onClick={() => setAbrirMaterial(false)}>Cancelar</button>

              <button className="miniBtn" onClick={publicarMaterial}>Publicar</button>

            </div>

          </div>

        </div>

      )}



      {abrirPendencias && (

        <div className="overlay">

          <div className="modal">

            <h2>Pendências da Turma</h2>

            {justificativas.length === 0 ? <p>Sem pendências 👍</p> :

              justificativas.map((j) => (

                <p key={j.id}>• {j.nome} - {j.titulo}</p>

              ))

            }

            <div className="acoesModal">

              <button className="fecharBtn" onClick={() => setAbrirPendencias(false)}>Fechar</button>

            </div>

          </div>

        </div>

      )}



      {/* ✅ BOTÃO FLUTUANTE */}

      <div className="floating-contact" onClick={() => setShowContactModal(true)}>

        <FaComments />

        <span>Contatos</span>

      </div>



      {/* ✅ MODAL DE CONTATOS */}

      {showContactModal && (

        <div className="contact-overlay active" onClick={() => setShowContactModal(false)}>

          <div className="contact-window" onClick={(e) => e.stopPropagation()}>

            <div className="contact-header">

              <h4>Lista de Contatos</h4>

              <button className="btn-close-contact" onClick={() => setShowContactModal(false)}>

                <FaTimes />

              </button>

            </div>

           

            <div className="contact-list" style={{ maxHeight: '450px', overflowY: 'auto' }}>

              <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>

                GESTÃO

              </div>

              <div className="contact-card" style={{ borderLeft: '4px solid #1a3a5a' }}>

                <strong>{contatoGestor.nome}</strong>

                <div className="contact-actions">

                  <a href={`mailto:${contatoGestor.email}`} className="action-link mail"><FaEnvelope /> Email</a>

                  <span className="action-link phone">{contatoGestor.tel}</span>

                </div>

              </div>



              <hr style={{ margin: '15px 0', opacity: '0.1' }} />



              <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>

                APRENDIZES CADASTRADOS

              </div>

              {aprendizesContatos.length > 0 ? (

                aprendizesContatos.map((aluno) => (

                  <div key={aluno.id} className="contact-card">

                    <strong>{aluno.nome}</strong> <span> | Aprendiz</span>

                    <div className="contact-actions">

                      <a href={`mailto:${aluno.email}`} className="action-link mail"><FaEnvelope /> Email</a>

                    </div>

                  </div>

                ))

              ) : (

                <p style={{ padding: '10px', fontSize: '0.8rem' }}>Nenhum aprendiz encontrado.</p>

              )}

            </div>

          </div>

        </div>

      )}

    </div>

  );

}