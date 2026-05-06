import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/gestor/Justificativas.css';
import { FaFileAlt } from 'react-icons/fa';

const GestaoAprendizes = () => {
  const [atividades, setAtividades] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [selecionado, setSelecionado] = useState(null);

  const carregarAtividades = async () => {
    try {
      const resposta = await axios.get('http://localhost:5000/api/atestados/gestor/pendentes-geral');
      setAtividades(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar atividades:", error);
    }
  };

  useEffect(() => { carregarAtividades(); }, []);

  const handleVerificar = (atividade) => {
    setSelecionado(atividade);
    setModalAberto(true);
  };

  const atualizarStatus = async (status) => {
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
            <h2>Analisar Justificativa</h2>
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
                <button className="btn-aceitar" onClick={() => atualizarStatus('Aprovado')}>ACEITAR</button>
                <button className="btn-recusar" onClick={() => atualizarStatus('Recusado')}>RECUSAR</button>
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