import React, { useState, useEffect } from 'react';
import './Boletim.css';
import { 
  FaBell, 
  FaUserCircle, 
  FaFileDownload, 
  FaComments, 
  FaTimes, 
  FaEnvelope 
} from 'react-icons/fa';

const Boletim = () => {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados para o Modal de Contatos
  const [showContactModal, setShowContactModal] = useState(false);

  const contatosSuporte = [
    { nome: "Sérgio Carvalho", cargo: "Gestor", email: "serginho@empresa.com", tel: "(21) 99999-9999" },
    { nome: "Vilma Nascimento", cargo: "Pedagogia", email: "amaior@ensino.com", tel: "(21) 88888-8888" }
  ];

  useEffect(() => {
    const aprendizId = 1;
    const url = `http://localhost:5000/api/boletim/aprendiz/${aprendizId}`;
    
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar boletim');
        return res.json();
      })
      .then((data) => {
        setDados(data);
        setLoading(false);
      })
      .catch((err) => {
        setErro(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando boletim...</p>;
  if (erro)    return <p>Erro: {erro}</p>;
  if (!dados)  return <p>Nenhum dado encontrado.</p>;

  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <h1>BOLETIM E FREQUÊNCIA</h1>
        <div className="header-icons">
          <FaBell />
          <FaUserCircle />
        </div>
      </header>

      <section className="resumo-boletim-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span>MÉDIA GERAL ACADÊMICA</span>
            <h2>{dados.media_geral}</h2>
          </div>
          <div className="stat-item">
            <span>SITUAÇÃO</span>
            <h2 className="status-highlight">{dados.situacao || 'REGULAR'}</h2>
          </div>
          <button className="btn-download" onClick={() => window.print()}>
            <FaFileDownload /> BAIXAR PDF
          </button>
        </div>
      </section>

      <div className="dashboard-content-grid" style={{ gridTemplateColumns: '1fr' }}>
        <section className="resumo-academico">
          <h3>DETALHAMENTO POR UNIDADE CURRICULAR</h3>
          <table className="tabela-notas">
            <thead>
              <tr>
                <th>Disciplina</th>
                <th style={{ textAlign: 'center' }}>Frequência</th>
                <th style={{ textAlign: 'center' }}>Nota Final</th>
                <th style={{ textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {dados.disciplinas.map((item, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: '700', color: '#1a3a5a' }}>
                    {item.nome_uc}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {item.frequencia_percentual}%
                  </td>
                  <td style={{ fontWeight: '700', textAlign: 'center' }}>
                    {parseFloat(item.nota).toFixed(1)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`tag-status ${parseFloat(item.nota) >= 7 ? 'aprovado' : 'reprovado'}`}>
                      {parseFloat(item.nota) >= 7 ? 'Aprovado' : 'Em curso'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default Boletim;