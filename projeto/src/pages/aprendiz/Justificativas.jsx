import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/Justificativas.css';

import { FaCloudUploadAlt, FaHistory, FaFileAlt } from 'react-icons/fa';
import { FaBell, FaUserCircle, FaFileDownload } from 'react-icons/fa';
import '../../styles/Justificativas.css';
import { 
  FaCloudUploadAlt, 
  FaHistory, 
  FaFileAlt, 
  FaComments, 
  FaTimes, 
  FaEnvelope 
} from 'react-icons/fa';
import axios from 'axios';

const Justificativas = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { id: 0, nome: 'Aprendiz', nivel: 'aprendiz' };
  const userId = usuarioLogado.id;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const estadoInicial = {
    titulo: '',
    motivo: '',
    data: '',
    arquivo: null,
    descricao: '',
    aprendiz_id: userId
  };

  const [formData, setFormData] = useState(estadoInicial);
  const [historico, setHistorico] = useState([]);

  // Estados para o Modal de Contatos
  const [showContactModal, setShowContactModal] = useState(false);

  const contatosSuporte = [
    { nome: "Sérgio Carvalho", cargo: "Gestor", email: "serginho@empresa.com", tel: "(21) 99999-9999" },
    { nome: "Vilma Nascimento", cargo: "Pedagogia", email: "amaior@ensino.com", tel: "(21) 88888-8888" }
  ];

  useEffect(() => {
    const buscarHistorico = async () => {
      if (!userId) return;
      try {
        const resposta = await axios.get(`http://localhost:5000/api/atestados/listar/${userId}`);
        setHistorico(resposta.data);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    };
    buscarHistorico();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleEnviar = async (e) => {
    if (e) e.preventDefault();

    const data = new FormData();
    data.append('aprendiz_id', formData.aprendiz_id);
    data.append('titulo', formData.titulo);
    data.append('motivo', formData.motivo);
    data.append('descricao', formData.descricao);
    data.append('data_emissao', formData.data);
    data.append('atestado', formData.arquivo);

    try {
      await axios.post("http://localhost:5000/api/atestados/enviar", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert("Atestado enviado com sucesso!");
      
      const novaLista = await axios.get(`http://localhost:5000/api/atestados/listar/${userId}`);
      setHistorico(novaLista.data);

      setFormData(estadoInicial);
      e.target.reset();
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data || error.message);
      alert("Erro ao enviar atestados.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div className="atestado-container">
      <header className="dash-header">
        <h1>REGISTRO DE JUSTIFICATIVAS</h1>
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

      <div className="atestado-grid">
        <section className="form-atestado">
          <h3><FaFileAlt /> NOVA JUSTIFICATIVA</h3>

          <form onSubmit={handleEnviar}>
            <div className="form-group">
              <label>Título da Justificativa</label>
              <input
                type="text"
                name="titulo"
                placeholder="Ex: Atestado Médico"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Motivo do Afastamento</label>
              <select 
                name="motivo" 
                value={formData.motivo} 
                onChange={handleChange} 
                required
              >
                <option value="">Selecione...</option>
                <option value="medico">Atestado Médico</option>
                <option value="luto">Luto</option>
                <option value="militar">Serviço Militar</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div className="form-group">
              <label>Data da Justificativa</label>
              <input 
                type="date" 
                name="data" 
                value={formData.data} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="upload-label">
                <FaCloudUploadAlt /> Upload do Documento (PDF/JPG)
                <input type="file" name="arquivo" onChange={handleChange} accept=".pdf,.jpg,.png" required />
              </label>
              {formData.arquivo && <span className="file-name">{formData.arquivo.name}</span>}
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea 
                name="descricao" 
                rows="3" 
                value={formData.descricao} 
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn-enviar">ENVIAR</button>
          </form>
        </section>

        <section className="historico-atestados">
          <h3><FaHistory /> ÚLTIMOS ENVIOS</h3>
          <div className="lista-historico">
            {historico.map(item => (
              <div key={item.id} className="historico-item">
                <div className="historico-info">
                  <strong>{item.titulo}</strong>
                  <span>  Referente a:  {new Date(item.data_emissao).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="status-container">
                   <span className={`status-badge`}>
                     Instituição: <span className={`status-badge-${item.status_instituicao.toLowerCase()}`}>{item.status_instituicao}</span>
                     <br />
                   </span>  
                   <span className={`status-badge`}>
                     Empresa: <span  className={`status-badge-${item.status_empresa.toLowerCase()}`}>{item.status_empresa}</span>
                   </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- MODAL DE CONTATOS --- */}
      {showContactModal && (
        <div className="contact-overlay active" onClick={() => setShowContactModal(false)}>
          <div className="contact-window" onClick={(e) => e.stopPropagation()}>
            <div className="contact-header">
              <h4>Contatos Responsáveis</h4>
              <button className="btn-close-contact" onClick={() => setShowContactModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="contact-list">
              {contatosSuporte.map((c, index) => (
                <div key={index} className="contact-card">
                  <strong>{c.nome}</strong>
                  <span> | {c.cargo}</span>
                  <div className="contact-actions">
                    <a href={`mailto:${c.email}`} className="action-link mail">
                      <FaEnvelope /> Email
                    </a>
                    <a href={`tel:${c.tel}`} className="action-link phone">{c.tel}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE */}
      <div className="floating-contact" onClick={() => setShowContactModal(true)}>
        <FaComments />
        <span>Contatos</span>
      </div>
    </div>
  );
};

export default Justificativas;