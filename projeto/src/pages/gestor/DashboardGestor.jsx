import React, { useState, useEffect } from 'react';
import './DashboardGestor.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importe o navigate
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaThLarge, FaBell, FaUserCircle, FaComments, FaEnvelope, FaTimes } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import ContatoPopup from '../../components/ContatoPopup';
import { contatos } from '../../services/mockData.js'; // Certifique-se de importar seus dados mockados

const DashboardGestor = () => {
  // 1. Estados de Autenticação e Menu
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { nome: 'Gestor', cargo: 'Gestor Petrobras' };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. Estados de Visitas e Gráficos
  const [dataVisita, setDataVisita] = useState(new Date());
  const [minhasVisitas, setMinhasVisitas] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState([]);

  // 3. Estados de Contato
  const [showContactModal, setShowContactModal] = useState(false);
  const [contatoSelecionado, setContatoSelecionado] = useState(null);

  const contatosSuporte = [
    { nome: "Sérgio Carvalho", cargo: "Gestor", email: "serginho@empresa.com", tel: "(21) 99999-9999" },
    { nome: "Vilma Nascimento", cargo: "Pedagogia", email: "amaior@ensino.com", tel: "(21) 88888-8888" }
  ];

  // --- LÓGICA DE DADOS ---

  const carregarVisitas = async () => {
    try {
      const gestorId = usuarioLogado.id || 1; 
      const response = await axios.get(`http://localhost:5000/api/visitas/listar/${gestorId}`);
      setMinhasVisitas(response.data);
    } catch (error) {
      console.error("Erro ao carregar visitas:", error);
    }
  };

  useEffect(() => {
    carregarVisitas();
    const buscarDadosGrafico = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/visitas/desempenho-turma');
        setDadosGrafico(response.data);
      } catch (error) {
        console.error("Erro na requisição do gráfico:", error);
      }
    };
    buscarDadosGrafico();
  }, []);

  // --- HANDLERS ---

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const handleAgendar = async () => {
    try {
      const ano = dataVisita.getFullYear();
      const mes = String(dataVisita.getMonth() + 1).padStart(2, '0');
      const dia = String(dataVisita.getDate()).padStart(2, '0');
      const dataFormatada = `${ano}-${mes}-${dia}`;

      await axios.post('http://localhost:5000/api/visitas/agendar', {
        gestor_id: usuarioLogado.id || 1,
        data_visita: dataFormatada
      });

      alert('Visita agendada com sucesso!');
      carregarVisitas();
    } catch (error) {
      alert('Erro ao agendar visita.');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <h1> <FaThLarge /> GESTÃO DE APRENDIZES</h1>
        
        <div className="header-icons">
          
          {/* IMPLEMENTAÇÃO DO MENU DE USUÁRIO */}
          <div className="icon-wrapper" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ cursor: 'pointer', position: 'relative' }}>
            <FaUserCircle />
            {isMenuOpen && (
              <div className="dropdown-popup">
                <div className="user-info-header">
                  <strong>{usuarioLogado.nome}</strong>

                  <span>{usuarioLogado.nivel === 'gestor' ? 'Gestor' : usuarioLogado.nivel} - Petrobras</span>
                </div>
                <ul>
                  <li className="logout-opt" onClick={handleLogout}>Sair do Sistema</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Seção de Visitas */}
      <section className="visitas-agendadas-section">
        <h3>VISITAS TÉCNICAS AGENDADAS</h3>
        <div className="visitas-lista">
          <table className="pendencias-table">
            <thead>
              <tr>
                <th>Data da Visita</th>
                <th>Status</th>
                <th>Criado em</th>
              </tr>
            </thead>
            <tbody>
              {minhasVisitas.map((visita) => (
                <tr key={visita.id}>
                  <td>{new Date(visita.data_visita).toLocaleDateString('pt-BR')}</td>
                  <td><span className={`status-badge-${(visita.status).toLowerCase()}`} >{visita.status}</span></td>
                  <td>{new Date(visita.data_criacao).toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="gestor-grid">
        <div className="monitoramento-card">
          <h3>MONITORAMENTO DE APRENDIZAGEM</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="performance" stroke="#2980b9" strokeWidth={3} name="Média da Turma" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="acoes-rapidas">
          <h3>AGENDAR VISITA TÉCNICA</h3>
          <div className="calendario-wrapper">
            <Calendar onChange={setDataVisita} value={dataVisita} locale="pt-BR" />
          </div>
          <button className="btn-confirmar" onClick={handleAgendar}> CONFIRMAR</button>
        </div>
      </div>

      {/* BOTÃO FLUTUANTE DE CONTATOS */}
      <div className="floating-contact" onClick={() => setShowContactModal(true)}>
        <FaComments />
        <span>Contatos</span>
      </div>

      {/* MODAL DE CONTATOS (Suporte) */}
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

      {/* POPUP DE CONTATO DO MURAL (Se necessário) */}
      {contatoSelecionado && (
        <ContatoPopup contato={contatoSelecionado} onClose={() => setContatoSelecionado(null)} />
      )}
    </div>
  );
};

export default DashboardGestor;