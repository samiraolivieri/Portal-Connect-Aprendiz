import React, { useState } from "react";
import "../../styles/comunicados.css";
import {
  FaBullhorn,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaComments,
  FaTimes,
  FaEnvelope
} from "react-icons/fa";

export default function Comunicados() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  
  // Estado para controlar o popup de contatos
  const [showContactModal, setShowContactModal] = useState(false);

  // Lista de Comunicados (Mock)
  const [comunicados, setComunicados] = useState([
    {
      id: 1,
      titulo: "Mudança de horário na sexta-feira",
      categoria: "Operacional",
      prioridade: "Alta",
      data: "15/04/2026",
      status: "Publicado",
      descricao: "Na sexta-feira o expediente começará às 09h.",
    },
    {
      id: 2,
      titulo: "Entrega de documentos obrigatórios",
      categoria: "RH",
      prioridade: "Média",
      data: "14/04/2026",
      status: "Rascunho",
      descricao: "Enviar documentos até o fim do mês.",
    }
  ]);

  // --- PARTE DOS CONTATOS ---
  // Informação fixa da Pedagoga
  const contatoPedagoga = { 
    nome: "Vilma Nascimento", 
    cargo: "Pedagogia", 
    email: "amaior@ensino.com", 
    tel: "(21) 88888-8888" 
  };

  // Simulando a lista de aprendizes (No Contracheque você usa o fetch, 
  // se quiser que apareça aqui também, use o useEffect com a rota de aprendizes)
  const [aprendizes, setAprendizes] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/auth/aprendizes') 
      .then(res => res.json())
      .then(data => setAprendizes(data))
      .catch(err => console.error("Erro ao carregar aprendizes:", err));
  }, []);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [visualizando, setVisualizando] = useState(null);

  const [form, setForm] = useState({
    id: null,
    titulo: "",
    categoria: "",
    prioridade: "Normal",
    status: "Publicado",
    descricao: "",
  });

  // --- FUNÇÕES DE GERENCIAMENTO (ABRIR, SALVAR, EXCLUIR) ---
  function abrirNovo() {
    setModoEdicao(false);
    setForm({ id: null, titulo: "", categoria: "", prioridade: "Normal", status: "Publicado", descricao: "" });
    setMostrarModal(true);
  }

  function editar(item) {
    setModoEdicao(true);
    setForm(item);
    setMostrarModal(true);
  }

  function salvar() {
    if (!form.titulo || !form.categoria || !form.descricao) {
      alert("Preencha os campos obrigatórios.");
      return;
    }
    if (modoEdicao) {
      setComunicados(comunicados.map((item) => item.id === form.id ? form : item));
    } else {
      const novo = { ...form, id: Date.now(), data: new Date().toLocaleDateString("pt-BR") };
      setComunicados([...comunicados, novo]);
    }
    setMostrarModal(false);
  }

  function excluir(id) {
    if (window.confirm("Deseja excluir este comunicado?")) {
      setComunicados(comunicados.filter((item) => item.id !== id));
    }
  }

  function corPrioridade(nivel) {
    if (nivel === "Alta") return "alta";
    if (nivel === "Média") return "media";
    return "normal";
  }

  let lista = comunicados.filter((item) =>
    item.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="comunicados-page">
      <header className="com-topo">
        <h1><FaBullhorn /> Comunicados Oficiais</h1>
        <button className="btn-novo" onClick={abrirNovo}><FaPlus /> Criar Comunicado</button>
      </header>

      {/* Busca e Filtros */}
      <section className="barra-busca">
        <FaSearch />
        <input type="text" placeholder="Buscar comunicado..." value={busca} onChange={(e) => setBusca(e.target.value)} />
      </section>

      {/* Tabela de Comunicados */}
      <section className="tabela-box">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoria</th>
              <th>Prioridade</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item) => (
              <tr key={item.id}>
                <td>{item.titulo}</td>
                <td>{item.categoria}</td>
                <td><span className={`badge ${corPrioridade(item.prioridade)}`}>{item.prioridade}</span></td>
                <td>{item.data}</td>
                <td className="acoes">
                  <button onClick={() => setVisualizando(item)}><FaEye /></button>
                  <button onClick={() => editar(item)}><FaEdit /></button>
                  <button onClick={() => excluir(item.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* MODAL DE CRIAÇÃO/EDIÇÃO OMITIDO PARA FOCO NO CONTATO */}

      {/* --- BOTÃO FLUTUANTE DE CONTATOS --- */}
      <div className="floating-contact" onClick={() => setShowContactModal(true)}>
        <FaComments />
        <span>Contatos</span>
      </div>

      {/* --- MODAL DE LISTA DE CONTATOS (PEDAGOGIA + APRENDIZES) --- */}
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
                      <a href={`mailto:${aluno.email}`} className="action-link mail" title={aluno.email}>
                        <FaEnvelope /> Email
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ padding: '10px', fontSize: '0.8rem' }}>Carregando aprendizes...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}