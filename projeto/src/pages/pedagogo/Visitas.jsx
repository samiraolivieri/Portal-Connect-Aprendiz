import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/gestor/Justificativas.css';
import { FaFileAlt, FaBell, FaUserCircle, FaFileDownload, FaComments, FaTimes, FaEnvelope } from 'react-icons/fa';

const GestaoAprendizes = () => {
  const [atividades, setAtividades] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [filtro, setFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");
  
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { nome: 'Aprendiz', nivel: 'aprendiz' };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aprendizes, setAprendizes] = useState([]);
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
 
 const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };
  
   const contatoGestor = { 
        nome: "Sérgio Carvalho", 
        email: "sergio.carvalho@petrobras.com.br", 
        tel: "(21) 99999-7777" 
    };

  const carregarAtividades = async () => {
    try {
      const resposta = await axios.get('http://localhost:5000/api/visitas/listar/1');
      setAtividades(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar atividades:", error);
    }
  };

 useEffect(() => {
  carregarAtividades();

  const fetchData = async () => {
    try {
      const resContatos = await axios.get("http://localhost:5000/api/turmas/dados/lancamento");
      
      // LOG DE TESTE: Abra o console (F12) e veja o que aparece aqui
      console.log("Dados recebidos:", resContatos.data);

      // Ajuste conforme o formato real do seu JSON
      const listaAlunos = Array.isArray(resContatos.data) 
        ? resContatos.data 
        : (resContatos.data.alunos || []);
        
      setAprendizes(listaAlunos);
    } catch (err) {
      console.error("Erro ao carregar contatos:", err);
    }
  };

  fetchData();
}, []); // Certifique-se de que o array de dependências está fechado corretamente

  const handleVerificar = (atividade) => {
    setSelecionado(atividade);
    setModalAberto(true);
  };

  const atualizarStatus = async (status) => {
    try {
      await axios.put(`http://localhost:5000/api/visitas/atualizar-status/${selecionado.id}`, {
        novoStatus: status
      });
      alert(`Visita Técnica ${status}!`);
      setModalAberto(false);
      carregarAtividades(); 
    } catch (error) {
      alert("Erro ao atualizar status.");
    }
  };

  let lista = atividades.filter((item) =>
    item.status
  );

  if (filtro === "Aprovado") lista = lista.filter((item) => item.status === "Aprovado");
  if (filtro === "Recusado") lista = lista.filter((item) => item.status === "Recusado");
  if (filtro === "Pendente") lista = lista.filter((item) => item.status === "Pendente");

  return (
    <div className="gestao-container">

      <header className="dash-header">
  <div className="titulo-pagina">
    <h1>
      <FaFileAlt className="icon-titulo" /> 
      Validação de Visitas Técnicas
    </h1>
  </div>

  <div className="header-icons">
          <div className="icon-wrapper" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ cursor: 'pointer' }}>
            <FaUserCircle />
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
<section className="filtros">
        {["Todos", "Pendente", "Aprovado", "Recusado"].map((item) => (
          <button key={item} className={filtro === item ? "ativo" : ""} onClick={() => setFiltro(item)}>{item}</button>
        ))}
      </section>
      
      <table className="tabela-atividades">
        <thead>
          <tr>
            <th>Data da Visita</th><th>Data de Criação</th><th>Status</th><th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {lista.map(item => (
            <tr key={item.id}>
              <td>{new Date(item.data_visita).toLocaleDateString('pt-BR')}</td>
              <td>{new Date(item.data_criacao).toLocaleDateString('pt-BR')}</td>
              <td><p className={`status-${item.status}`}>{item.status}</p></td>
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
            <h2>Aceitar Visita?</h2>
            

            <div className="modal-actions">
              
              
              <div className="group-decisao">
                <button className="btn-aceitar" onClick={() => atualizarStatus('Aprovado')}>ACEITAR</button>
                <button className="btn-recusar" onClick={() => atualizarStatus('Recusado')}>RECUSAR</button>
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