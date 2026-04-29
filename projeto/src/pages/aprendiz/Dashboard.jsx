import React, { useState } from 'react';
import './Dashboard.css';
import ActivityCard from '../../components/ActivityCard.jsx';
import ContatoPopup from '../../components/ContatoPopup.jsx';
import { atividadesPendentes, muralUnidade, contatos } from '../../services/mockData.js';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [contatoSelecionado, setContatoSelecionado] = useState(null);

  // Futuramente: buscar da API GET /api/contatos
  const abrirContato = (autorNome) => {
    const encontrado = contatos.find(c =>
      c.responsavel.toLowerCase().includes(autorNome.split(' ')[0].toLowerCase())
    );
    setContatoSelecionado(encontrado || contatos[0]);
  };

  return (
    <div className="dashboard-container">

<header className="dash-header">
        <h1>OLÁ, NIVALDO ARAÚJO</h1>
        <div className="header-icons">
          <FaBell />
          <FaUserCircle />
        </div>
      </header>

      <section className="atividades-section">
        <h3>ATIVIDADES PENDENTES</h3>
        <div className="cards-grid">
          {atividadesPendentes.map(item => (
            <ActivityCard
              key={item.id}
              titulo={item.titulo}
              status={item.status}
              urgencia={item.urgencia}
              tipo={item.tipo}
              acao={item.acao}
            />
          ))}
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
                <div
                  className="mural-avatar"
                  onClick={() => abrirContato(post.autor)}
                  title="Ver contato"
                >
                  {post.autor.charAt(0)}
                </div>
                <div className="mural-corpo">
                  <div className="mural-meta">
                    <span
                      className="mural-autor"
                      onClick={() => abrirContato(post.autor)}
                      style={{ cursor: 'pointer' }}
                    >
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

      {/* Pop-up de contato */}
      {contatoSelecionado && (
        <ContatoPopup
          contato={contatoSelecionado}
          onClose={() => setContatoSelecionado(null)}
        />
      )}

    </div>
  );
};

export default Dashboard;