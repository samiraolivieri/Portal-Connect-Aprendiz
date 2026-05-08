import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Adicionado para o logout funcionar
import '../../styles/gestor/Justificativas.css';
import { FaThLarge, FaBell, FaUserCircle, FaComments, FaEnvelope, FaTimes } from 'react-icons/fa';

const GestaoAprendizes = () => {
  const navigate = useNavigate(); // Inicializado o hook de navegação
  const [atividades, setAtividades] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const carregarAtividades = async () => {
    try {
      const resposta = await axios.get('http://localhost:5000/api/atestados/gestor/pendentes-geral');
      setAtividades(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar atividades:", error);
    }
  };

  useEffect(() => { 
    carregarAtividades(); 
  }, []);

  const handleVerificar = (atividade) => {
    setSelecionado(atividade);
    setModalAberto(true);
  };

  const actualizarStatus = async (status) => {
    try {
      await axios.put(`http://localhost:5000/api/atestados/atualizar-status/empresa/${selecionado.id}`, {
        novoStatus: status
      });
      alert(`Justificativa ${status}!`);
      setModalAberto(false);
      carregarAtividades(); 
    } catch (error) {
      alert("Erro ao atualizar status.");
    }
  };

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { nome: 'Gestor', cargo: 'Gestor Petrobras' };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div className="gestao-container">

      <header className="dash-header">
  <div className="titulo-pagina">
    <h1>
      <FaFileAlt className="icon-titulo" /> 
      Validação de Justificativas
    </h1>
  </div>
</header>

      
      {/* HEADER CORRIGIDO: TÍTULO E PERFIL JUNTOS NA MESMA LINHA */}
      <div className="justificativas-header">
        <h1>GESTÃO DE APRENDIZES</h1>
        
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
      
      {/* TABELA DE ATIVIDADES */}
      <table className="tabela-atividades">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Aprendiz</th>
            <th>Data</th>
            <th>Ação</th>
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

      {/* MODAL DE ANÁLISE */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Analisar Justificativa</h2>
            <p><strong>Aprendiz:</strong> {selecionado.aprendiz_nome}</p>
            <p><strong>Motivo:</strong> {selecionado.motivo}</p>

            <div className="modal-actions">
              <button className="btn-analisar" onClick={() => {
                const urlCompleta = `http://localhost:5000/${selecionado.url_arquivo.replace(/\\/g, '/')}`;
                window.open(urlCompleta, '_blank');
              }}>
                ANALISAR (VER PDF)
              </button>
              
              <div className="group-decisao">
                <button className="btn-aceitar" onClick={() => actualizarStatus('Aprovado')}>ACEITAR</button>
                <button className="btn-recusar" onClick={() => actualizarStatus('Recusado')}>RECUSAR</button>
              </div>

              <button className="btn-voltar" onClick={() => setModalAberto(false)}>VOLTAR</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestaoAprendizes;