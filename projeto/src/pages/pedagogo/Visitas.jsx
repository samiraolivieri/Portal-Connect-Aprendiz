import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/gestor/Justificativas.css';
import { FaFileAlt } from 'react-icons/fa';

const GestaoAprendizes = () => {
  const [atividades, setAtividades] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [filtro, setFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");
  
  
  

  const carregarAtividades = async () => {
    try {
      const resposta = await axios.get('http://localhost:5000/api/visitas/listar/1');
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
    </div>
  );
};

export default GestaoAprendizes;