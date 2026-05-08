import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contracheque.css';
import { 
  FaMoneyBillWave, 
  FaCloudUploadAlt, 
  FaFilePdf, 
  FaHistory, 
  FaComments,
  FaTimes,
  FaEnvelope,
  FaUserCircle
} from 'react-icons/fa';
import './Contracheque.css';
const Contracheque = () => {
  const navigate = useNavigate();
  const [aprendizes, setAprendizes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [aprendizId, setAprendizId] = useState('');
  const [mesReferencia, setMesReferencia] = useState('');
  const [ultimosEnvios, setUltimosEnvios] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { nome: 'Gestor', cargo: 'Gestor Petrobras' };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };





  
  // Estado para controlar o popup de contatos
  const [showContactModal, setShowContactModal] = useState(false);

  // Informação fixa da Pedagoga
  const contatoPedagoga = { 
    nome: "Vilma Nascimento", 
    cargo: "Pedagogia", 
    email: "amaior@ensino.com", 
    tel: "(21) 88888-8888" 
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/aprendizes') 
      .then(res => res.json())
      .then(data => setAprendizes(data))
      .catch(err => console.error("Erro ao carregar aprendizes:", err));

    carregarEnvios();
  }, []);

  const carregarEnvios = () => {
    fetch('http://localhost:5000/api/contracheque/todos')
      .then(res => res.json())
      .then(data => setUltimosEnvios(data))
      .catch(err => console.error("Erro ao carregar histórico:", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile || !aprendizId || !mesReferencia) {
      alert("Por favor, preencha todos os campos e selecione um arquivo.");
      return;
    }

    const formData = new FormData();
    formData.append('aprendiz_id', aprendizId);
    formData.append('mes_referencia', mesReferencia);
    formData.append('arquivo', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/contracheque/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Contracheque liberado com sucesso!");
        setSelectedFile(null);
        setAprendizId('');
        setMesReferencia('');
        carregarEnvios(); 
      } else {
        alert("Erro ao enviar contracheque.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="contracheque-container">
      
      {/* HEADER EXATAMENTE IGUAL AO SEU PRIMEIRO PRINT */}
      <header className="desempenho-header">
        <div className="header-content-left">
          <h1 className="titulo-pagina">GERENCIAMENTO DE CONTRACHEQUES</h1>
        </div>

        <div className="header-icons">
          <div className="icon-wrapper" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaUserCircle />
            {isMenuOpen && (
              <div className="dropdown-popup">
                <div className="user-info-header">
                  <strong>{usuarioLogado.nome}</strong>
                  <span>{usuarioLogado.cargo}</span>
                </div>
                <ul>
                  <li className="logout-opt" onClick={handleLogout}>Sair do Sistema</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* GRID DO SEU PRIMEIRO PRINT */}
      <div className="layout-grid">
        <section className="card-upload">
          <h3><FaCloudUploadAlt /> NOVO UPLOAD</h3>
          
          <form className="form-upload" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Selecionar Aprendiz</label>
              <select 
                className="input-field" 
                value={aprendizId} 
                onChange={(e) => setAprendizId(e.target.value)}
              >
                <option value="">Escolha o aprendiz...</option>
                {aprendizes.map(aluno => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Mês de Referência</label>
              <input 
                type="month" 
                className="input-field" 
                value={mesReferencia}
                onChange={(e) => setMesReferencia(e.target.value)}
              />
            </div>

            <div className="upload-box">
              <input 
                type="file" 
                id="file-input" 
                accept=".pdf" 
                onChange={(e) => setSelectedFile(e.target.files[0])} 
              />
              <label htmlFor="file-input">
                <FaFilePdf size={30} />
                <p>{selectedFile ? selectedFile.name : "Clique para selecionar o PDF do Contracheque"}</p>
              </label>
            </div>

            <button type="submit" className="btn-enviar-contracheque">
              LIBERAR PARA O APRENDIZ
            </button>
          </form>
        </section>

        <section className="card-historico">
          <h3><FaHistory /> ÚLTIMOS ENVIOS</h3>
          <div className="lista-envios">
            {ultimosEnvios.map(envio => (
              <div key={envio.id} className="item-envio">
                <div className="envio-info">
                  <strong>{envio.aprendiz_nome || envio.nome}</strong>
                  <span>Referência: {envio.mes_referencia || envio.mes}</span>
                </div>
                <div className="envio-data">
                  <span>Enviado em: {new Date(envio.data_upload || envio.data).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
            {ultimosEnvios.length === 0 && (
              <p className="empty-msg">Nenhum envio realizado recentemente.</p>
            )}
          </div>
        </section>

      </div>

      {/* Botão Flutuante de Contatos */}
      <div className="floating-contact" onClick={() => setShowContactModal(true)}>
        <FaComments />
        <span>Contatos</span>
      </div>

      {/* Modal de Suporte e Lista de Alunos */}
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
              
              {/* SEÇÃO: PEDAGOGIA */}
              <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>
                PEDAGOGIA
              </div>
              <div className="contact-card" style={{ borderLeft: '4px solid #2e7d32' }}>
                <strong>{contatoPedagoga.nome}</strong> <span> | {contatoPedagoga.cargo}</span>
                <div className="contact-actions">
                  <a href={`mailto:${contatoPedagoga.email}`} className="action-link mail">
                    <FaEnvelope /> Email
                  </a>
                  <a href={`tel:${contatoPedagoga.tel}`} className="action-link phone">{contatoPedagoga.tel}</a>
                </div>
              </div>

              <hr style={{ margin: '15px 0', opacity: '0.1' }} />

              {/* SEÇÃO: APRENDIZES (DO BANCO) */}
              <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>
                APRENDIZES
              </div>
              {aprendizes.length > 0 ? (
                aprendizes.map((aluno) => (
                  <div key={aluno.id} className="contact-card">
                    <strong>{aluno.nome}</strong> <span> | Aprendiz</span>
                    <div className="contact-actions">
                      {/* Trocamos o texto longo do email pela palavra "Email" fixa */}
                      <a href={`mailto:${aluno.email}`} className="action-link mail" title={aluno.email}>
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

export default Contracheque;