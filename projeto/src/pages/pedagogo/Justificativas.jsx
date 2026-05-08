import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaFileDownload } from 'react-icons/fa';
 
import axios from 'axios';
import '../../styles/gestor/Justificativas.css';
import { 
  FaUserFriends, 
  FaFileAlt, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaComments, 
  FaTimes, 
  FaEnvelope, 
  FaUserTie, 
  FaUsers 
} from 'react-icons/fa';

const GestaoAprendizes = () => {
  const [atividades, setAtividades] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  
  // ✅ Estados para o Modal de Contatos
  const [aprendizes, setAprendizes] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { nome: 'Aprendiz', nivel: 'aprendiz' };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
 
 const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };
 

  // ✅ Informação fixa do Gestor (Sérgio Carvalho)
  const contatoGestor = { 
    nome: "Sérgio Carvalho", 
    email: "sergio.carvalho@petrobras.com.br", 
    tel: "(21) 99999-7777" 
  };

  const carregarDados = async () => {
    try {
      const resposta = await axios.get('http://localhost:5000/api/atestados/pedagogo/pendentes-geral');
      setAtividades(resposta.data);

      // ✅ Busca a lista de aprendizes para o modal de contatos
      const resContatos = await axios.get('http://localhost:5000/api/turmas/dados/lancamento');
      setAprendizes(resContatos.data.alunos || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  useEffect(() => { carregarDados(); }, []);

  const handleVerificar = (atividade) => {
    setSelecionado(atividade);
    setModalAberto(true);
  };

  const atualizarStatus = async (status) => {
    try {
      await axios.put(`http://localhost:5000/api/atestados/atualizar-status/pedagogo/${selecionado.id}`, {
        novoStatus: status
      });
      alert(`Justificativa ${status}!`);
      setModalAberto(false);
      carregarDados(); 
    } catch (error) {
      alert("Erro ao atualizar status.");
    }
  };

  return (
    <div className="gestao-container">
      <header className="topo-pedagogo" style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#1a3a5a', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FaUserFriends /> GESTÃO DE APRENDIZES
        </h1>

        <div className="header-icons">
          <div className="icon-wrapper" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ cursor: 'pointer' }}>
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
      
      <table className="tabela-atividades">
        <thead>
          <tr>
            <th>Tipo</th><th>Aprendiz</th><th>Data</th><th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {atividades.map(item => (
            <tr key={item.id}>
              <td>{item.titulo}</td>
              <td>{item.aprendiz_nome}</td>
              <td>{new Date(item.data_emissao).toLocaleDateString('pt-BR')}</td>
              <td>
                <button className="btn-verificar" onClick={() => handleVerificar(item)}>
                  VERIFICAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ color: '#1a3a5a' }}><FaFileAlt /> Analisar Justificativa</h2>
            <hr style={{ margin: '15px 0', opacity: '0.2' }} />
            
            <p><strong>Aprendiz:</strong> {selecionado.aprendiz_nome}</p>
            <p><strong>Motivo:</strong> {selecionado.motivo}</p>

            <div className="modal-actions">
              <button className="btn-analisar" onClick={() => {
                const urlCompleta = `http://localhost:5000/${selecionado.url_arquivo.replace(/\\/g, '/')}`;
                window.open(urlCompleta, '_blank');
              } }>
                ANALISAR (VER PDF)
              </button>
              
              <div className="group-decisao">
                <button className="btn-aceitar" onClick={() => atualizarStatus('Aprovado')}>
                  <FaCheckCircle /> ACEITAR
                </button>
                <button className="btn-recusar" onClick={() => atualizarStatus('Recusado')}>
                  <FaTimesCircle /> RECUSAR
                </button>
              </div>

              <button className="btn-voltar" onClick={() => setModalAberto(false)}>VOLTAR</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ BOTÃO FLUTUANTE DE CONTATOS */}
      <div className="floating-contact" onClick={() => setShowContactModal(true)}>
        <FaComments />
        <span>Contatos</span>
      </div>

      {/* ✅ MODAL DE CONTATOS UNIFICADO */}
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
              {/* SEÇÃO: GESTÃO */}
              <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>
                GESTÃO
              </div>
              <div className="contact-card" style={{ borderLeft: '4px solid #1a3a5a' }}>
                <strong>{contatoGestor.nome}</strong>
                <div className="contact-actions">
                  <a href={`mailto:${contatoGestor.email}`} className="action-link mail">
                    <FaEnvelope /> Email
                  </a>
                  <span className="action-link phone">{contatoGestor.tel}</span>
                </div>
              </div>

              <hr style={{ margin: '15px 0', opacity: '0.1' }} />

              {/* SEÇÃO: APRENDIZES */}
              <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>
                APRENDIZES CADASTRADOS
              </div>
              {aprendizes.length > 0 ? (
                aprendizes.map((aluno) => (
                  <div key={aluno.id} className="contact-card">
                    <strong>{aluno.nome}</strong> <span> | Aprendiz</span>
                    <div className="contact-actions">
                      <a href={`mailto:${aluno.email}`} className="action-link mail">
                        <FaEnvelope /> Email
                      </a>
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
};

export default GestaoAprendizes;