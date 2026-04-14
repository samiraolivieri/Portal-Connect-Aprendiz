import React, { useState } from 'react';
import './Boletim.css';
import { FaBell, FaUserCircle, FaFileDownload } from 'react-icons/fa';

const Boletim = () => {
  // Criamos um objeto de dados manuais (Mock Data)
  // Isso simula exatamente o que viria do seu banco de dados
  const [dados] = useState({
    media_geral: "8.7",
    situacao: "REGULAR",
    disciplinas: [
      {
        nome_uc: "Back-end",
        frequencia_percentual: 95.5,
        nota: 8.5,
        status: "Aprovado"
      },
      {
        nome_uc: "Front-end com React",
        frequencia_percentual: 92.0,
        nota: 9.0,
        status: "Aprovado"
      },
      {
        nome_uc: "Banco de Dados MySQL",
        frequencia_percentual: 88.0,
        nota: 7.5,
        status: "Aprovado"
      },
      {
        nome_uc: "Lógica de Programação",
        frequencia_percentual: 100,
        nota: 10,
        status: "Aprovado"
      },
      {
        nome_uc: "Desenvolvimento Web Front-end",
        frequencia_percentual: 98.0,
        nota: 9.0,
         status: "Aprovado"
      },
      {
        nome_uc: "Análise de Sistemas",
        frequencia_percentual: 90.0,
        nota: 8.0,
         status: "Aprovado"
      },
      {
        nome_uc: "Gestão Empresarial",
        frequencia_percentual: 85.5,
        nota: 7.5,
         status: "Aprovado"
      },
      {
        nome_uc: "Metodologias Ágeis",
        frequencia_percentual: 100,
        nota: 9.8,
         status: "Aprovado"
      }
    ]
  });

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
            <h2 className="status-highlight">{dados.situacao}</h2>
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
                    {item.nota.toFixed(1)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`tag-status ${item.nota >= 7 ? 'aprovado' : 'reprovado'}`}>
                      {item.nota >= 7 ? 'Aprovado' : 'Em curso'}
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