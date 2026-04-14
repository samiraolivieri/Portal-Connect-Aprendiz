import React, { useState, useEffect } from 'react';
import './Boletim.css';
import { FaBell, FaUserCircle, FaFileDownload } from 'react-icons/fa';
 
const Boletim = () => {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
 
  useEffect(() => {
    const aprendizId = 1;
    const url = `http://localhost:5000/api/boletim/aprendiz/${aprendizId}`;
    console.log("Chamando URL:", url);
 
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar boletim');
        return res.json();
      })
      .then((data) => {
        console.log("Dados recebidos:", data);
        setDados(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Erro completo:", err);
        setErro(err.message);
        setLoading(false);
      });
  }, []); // 👈 useEffect DENTRO do componente, antes do return
 
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
    </div>
  );
};
 
export default Boletim;