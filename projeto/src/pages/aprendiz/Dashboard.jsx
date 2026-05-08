import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import './Dashboard.css';
import ContatoPopup from '../../components/ContatoPopup.jsx';
import { muralUnidade, contatos } from '../../services/mockData.js';
import {
  FaUserCircle,
  FaFileInvoiceDollar,
  FaBookOpen,
  FaComments,
  FaEnvelope,
  FaTimes,
  FaDownload
} from 'react-icons/fa';

const Dashboard = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { id: 0, nome: 'Aprendiz' };
  
  const [contatoSelecionado, setContatoSelecionado] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [listaContracheques, setListaContracheques] = useState([]);
  const [showPaycheckModal, setShowPaycheckModal] = useState(false);
  
  const [listaMateriais, setListaMateriais] = useState([]);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  
  const [date, setDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const usuarioId = usuarioLogado.id; 

  useEffect(() => {
    if (usuarioId > 0) {
      fetch(`http://localhost:5000/api/contracheque/meus/${usuarioId}`)
        .then(res => res.json())
        .then(data => setListaContracheques(data))
        .catch(err => console.error("Erro ao buscar contracheques:", err));
    }
  }, [usuarioId]);

  useEffect(() => {
    fetch('http://localhost:5000/api/materiais')
      .then(res => res.json())
      .then(data => setListaMateriais(data))
      .catch(err => console.error("Erro ao buscar materiais:", err));
  }, []);

  const contatosSuporte = [
    { nome: "Sérgio Carvalho", cargo: "Gestor", email: "serginho@empresa.com", tel: "(21) 99999-9999" },
    { nome: "Vilma Nascimento", cargo: "Pedagogia", email: "amaior@ensino.com", tel: "(21) 88888-8888" }
  ];

  const abrirContato = (autorNome) => {
    const encontrado = contatos.find(c =>
      c.responsavel.toLowerCase().includes(autorNome.split(' ')[0].toLowerCase())
    );
    setContatoSelecionado(encontrado || contatos[0]);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <h1>OLÁ, {usuarioLogado.nome.toUpperCase()}</h1>
        <div className="header-icons">
          <div className="icon-wrapper" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ cursor: 'pointer' }}>
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
      </header>

      <section className="atividades-section">
        <h3>CALENDÁRIO DE ATIVIDADES</h3>
        <div className="calendar-wrapper" style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
          <Calendar onChange={setDate} value={date} />
        </div>
      </section>

      <div className="dashboard-content-grid">
        <section className="resumo-academico">
          <h3>RESUMO ACADÊMICO (Notas & Faltas)</h3>
          <table className="tabela-notas">
            <thead>
              <tr>
                <th>Disciplina</th>
                <th>% Frequência</th>
                <th>Notas</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Lógica de Programação</td><td>95%</td><td>8.5</td></tr>
              <tr><td>Banco de Dados</td><td>88%</td><td>7.0</td></tr>
            </tbody>
          </table>
        </section>

        <section className="mural-unidade">
          <h3>MURAL DA UNIDADE (SENAI)</h3>
          <div className="mural-lista">
            {muralUnidade.map(post => (
              <div key={post.id} className="mural-item">
                <div className="mural-avatar" onClick={() => abrirContato(post.autor)} title="Ver contato">
                  {post.autor.charAt(0)}
                </div>
                <div className="mural-corpo">
                  <div className="mural-meta">
                    <span className="mural-autor" onClick={() => abrirContato(post.autor)} style={{ cursor: 'pointer' }}>
                      {post.autor}
                    </span>
                    <span className="mural-cargo">{post.cargo}</span>
                  </div>
                  <p className="mural-mensagem">{post.mensagem}</p>
                  <span className="mural-tempo">{post.tempo}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="docs-pedagogico-section">
        <div className="section-docs-container">
          <div className="doc-item-card">
            <div className="doc-icon-circle blue-icon"><FaFileInvoiceDollar /></div>
            <div className="doc-text">
              <h4>Contracheques</h4>
              <span className="doc-status available">
                {listaContracheques.length > 0 ? `${listaContracheques.length} disponível(is)` : "Nenhum disponível"}
              </span>
            </div>
            <button className="btn-view-doc" onClick={() => setShowPaycheckModal(true)}>Visualizar</button>
          </div>

          <div className="doc-item-card">
            <div className="doc-icon-circle green-icon"><FaBookOpen /></div>
            <div className="doc-text">
              <h4>Material Pedagógico</h4>
              <p>Instituição: SENAI</p>
              <span className="doc-status update">{listaMateriais.length} arquivo(s)</span>
            </div>
            <button className="btn-view-doc" onClick={() => setShowMaterialModal(true)}>Acessar</button>
          </div>
        </div>
      </section>

      {/* --- MODAIS --- */}
      
      {/* Modal Contatos Suporte */}
      {showContactModal && (
        <div className="contact-overlay active" onClick={() => setShowContactModal(false)}>
          <div className="contact-window" onClick={(e) => e.stopPropagation()}>
            <div className="contact-header">
              <h4>Contatos Responsáveis</h4>
              <button className="btn-close-contact" onClick={() => setShowContactModal(false)}><FaTimes /></button>
            </div>
            <div className="contact-list">
              {contatosSuporte.map((c, index) => (
                <div key={index} className="contact-card">
                  <strong>{c.nome}</strong>
                  <span>{c.cargo}</span>
                  <div className="contact-actions">
                    <a href={`mailto:${c.email}`} className="action-link mail"><FaEnvelope /> Email</a>
                    <a href={`tel:${c.tel}`} className="action-link phone">{c.tel}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Contracheques */}
      {showPaycheckModal && (
        <div className="contact-overlay active" onClick={() => setShowPaycheckModal(false)}>
          <div className="contact-window" onClick={(e) => e.stopPropagation()}>
            <div className="contact-header">
              <h4>Meus Contracheques</h4>
              <button className="btn-close-contact" onClick={() => setShowPaycheckModal(false)}><FaTimes /></button>
            </div>
            <div className="contact-list">
              {listaContracheques.length > 0 ? (
                listaContracheques.map((item) => (
                  <div key={item.id} className="contact-card">
                    <div className="contact-info">
                      <strong>Competência: {item.mes_referencia}</strong>
                      <p style={{ fontSize: '0.85rem', color: '#555' }}>Empresa: Petrobras</p>
                    </div>
                    <div className="contact-actions">
                      <a href={`http://localhost:5000/${item.caminho_arquivo}`} target="_blank" rel="noopener noreferrer" className="action-link mail" style={{ backgroundColor: '#007bff' }}>
                        <FaDownload style={{marginRight: '5px'}}/> Visualizar
                      </a>
                    </div>
                  </div>
                ))
              ) : <p style={{padding: '20px'}}>Nenhum contracheque.</p>}
            </div>
          </div>
        </div>
      )}

      {/* Modal Materiais */}
      {showMaterialModal && (
        <div className="contact-overlay active" onClick={() => setShowMaterialModal(false)}>
          <div className="contact-window" onClick={(e) => e.stopPropagation()}>
            <div className="contact-header">
              <h4>Materiais Pedagógicos</h4>
              <button className="btn-close-contact" onClick={() => setShowMaterialModal(false)}><FaTimes /></button>
            </div>
            <div className="contact-list">
              {listaMateriais.length > 0 ? (
                listaMateriais.map((mat) => (
                  <div key={mat.id} className="contact-card">
                    <strong>{mat.titulo}</strong>
                    <a href={`http://localhost:5000/uploads/${mat.arquivo_path}`} target="_blank" rel="noopener noreferrer" className="action-link mail" style={{ backgroundColor: '#28a745' }}>
                      <FaDownload style={{marginRight: '5px'}}/> Baixar Material
                    </a>
                  </div>
                ))
              ) : <p style={{padding: '20px'}}>Nenhum material disponível.</p>}
            </div>
          </div>
        </div>
      )}

      <div className="floating-contact" onClick={() => setShowContactModal(true)}>
        <FaComments />
        <span>Contatos</span>
      </div>

      {contatoSelecionado && (
        <ContatoPopup contato={contatoSelecionado} onClose={() => setContatoSelecionado(null)} />
      )}
    </div>
  );
};

export default Dashboard;