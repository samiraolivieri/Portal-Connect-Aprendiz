import React, { useState, useEffect } from "react";
import axios from "axios";
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

import { FaThLarge, FaBell, FaUserCircle, FaComments, FaEnvelope, FaTimes } from 'react-icons/fa';
const API_URL = "http://localhost:5000/api/comunicados/comunicados";

export default function Comunicados() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [comunicados, setComunicados] = useState([]);
  const [aprendizes, setAprendizes] = useState([]); // Para a lista de contatos

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { nome: 'Gestor', cargo: 'Gestor Petrobras' };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
   const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  
  const usuarioLogado = localStorage.getItem("usuario");
  const usuarioObj = usuarioLogado ? JSON.parse(usuarioLogado) : null;
  const userId = usuarioObj ? usuarioObj.id : null;

  const contatoPedagoga = { 
    nome: "Vilma Nascimento", 
    cargo: "Pedagogia", 
    email: "amaior@ensino.com", 
    tel: "(21) 88888-8888" 
  };

  const estadoInicial = {
    id: null,
    autor_id: userId,
    titulo: "",
    conteudo: "",     
    tipo_alvo: "Todos", 
    prioridade: "Normal",
    status: "Publicado",
    descricao: "",
  };

  const [form, setForm] = useState(estadoInicial);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [visualizando, setVisualizando] = useState(null);

  const carregarComunicados = async () => {
    try {
      const response = await axios.get(API_URL);
      setComunicados(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar comunicados:", error);
    }
  };

  const carregarAprendizes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/aprendizes');
      setAprendizes(response.data);
    } catch (error) {
      console.error("Erro ao carregar aprendizes:", error);
    }
  };

  useEffect(() => {
    carregarComunicados();
    carregarAprendizes();
  }, []);

  function abrirNovo() {
    setModoEdicao(false);
    setForm(estadoInicial);
    setMostrarModal(true);
  }

  function editar(item) {
    setModoEdicao(true);
    setForm(item);
    setMostrarModal(true);
  }

  async function salvar() {
    if (!form.titulo || !form.conteudo || !form.descricao) {
      alert("Preencha os campos obrigatórios (Título, Conteúdo Breve e Descrição).");
      return;
    }

    if (!userId) {
      alert("Erro: Usuário não identificado. Por favor, faça login novamente.");
      return;
    }

    try {
      const dadosParaEnviar = { ...form, autor_id: userId };

      if (modoEdicao) {
        await axios.put(`${API_URL}/${form.id}`, dadosParaEnviar);
      } else {
        await axios.post(API_URL, dadosParaEnviar);
      }
      
      carregarComunicados();
      setMostrarModal(false);
      alert("Sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar no banco.");
    }
  }

  async function excluir(id) {
    if (window.confirm("Deseja excluir este comunicado?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        carregarComunicados();
      } catch (error) {
        alert("Erro ao excluir.");
      }
    }
  }

  let lista = comunicados.filter((item) =>
    item.titulo?.toLowerCase().includes(busca.toLowerCase())
  );

  if (filtro === "Publicados") lista = lista.filter((item) => item.status === "Publicado");
  if (filtro === "Rascunhos") lista = lista.filter((item) => item.status === "Rascunho");
  if (filtro === "Urgentes") lista = lista.filter((item) => item.prioridade === "Alta");
  if (filtro === "Expirados") lista = lista.filter((item) => item.status === "Expirado");

  return (
    <div className="comunicados-page">
      <header className="com-topo">
        <h1>
          <FaBullhorn /> Comunicados Oficiais
        </h1>

       


        {/* IMPLEMENTAÇÃO DO MENU DE USUÁRIO */}
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

        <h1><FaBullhorn /> Comunicados Oficiais</h1>
        <button className="btn-novo" onClick={abrirNovo}><FaPlus /> Criar Comunicado</button>
      </header>

      <section className="barra-busca">
        <FaSearch />
        <input type="text" placeholder="Buscar por título..." value={busca} onChange={(e) => setBusca(e.target.value)} />
      </section>

      <section className="filtros">
        {["Todos", "Publicados", "Rascunhos", "Urgentes", "Expirados"].map((item) => (
          <button key={item} className={filtro === item ? "ativo" : ""} onClick={() => setFiltro(item)}>{item}</button>
        ))}
      </section>
      


      <section className="tabela-box">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Alvo</th>
              <th>Prioridade</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item) => (
              <tr key={item.id}>
                <td>{item.titulo}</td>
                <td>{item.tipo_alvo}</td>
                <td><span className={`badge ${item.prioridade?.toLowerCase()}`}>{item.prioridade}</span></td>
                <td>{item.data_publicacao ? new Date(item.data_publicacao).toLocaleDateString('pt-BR') : '---'}</td>
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

      {/* --- BOTÃO FLUTUANTE DE CONTATOS --- */}
      <div className="floating-contact" onClick={() => setShowContactModal(true)}>
        <FaComments />
        <span>Contatos</span>
      </div>

      {/* --- MODAL DE LISTA DE CONTATOS --- */}
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
              <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>PEDAGOGIA</div>
              <div className="contact-card">
                <strong>{contatoPedagoga.nome}</strong> <span> | {contatoPedagoga.cargo}</span>
                <div className="contact-actions">
                  <a href={`mailto:${contatoPedagoga.email}`} className="action-link mail"><FaEnvelope /> Email</a>
                  <a href={`tel:${contatoPedagoga.tel}`} className="action-link phone">{contatoPedagoga.tel}</a>
                </div>
              </div>
              <hr style={{ margin: '15px 0', opacity: '0.1' }} />
              <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>APRENDIZES</div>
              {aprendizes.map((aluno) => (
                <div key={aluno.id} className="contact-card">
                  <strong>{aluno.nome}</strong> <span> | Aprendiz</span>
                  <div className="contact-actions">
                    <a href={`mailto:${aluno.email}`} className="action-link mail"><FaEnvelope /> Email</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CRIAR / EDITAR */}
      {mostrarModal && (
        <div className="modal-bg">
          <div className="modal">
            <h2>{modoEdicao ? "Editar Comunicado" : "Novo Comunicado"}</h2>
            <input type="text" placeholder="Título" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
            <input type="text" placeholder="Conteúdo Breve (ex: RH, Operacional)" value={form.conteudo} onChange={(e) => setForm({ ...form, conteudo: e.target.value })} />
            
            <select value={form.tipo_alvo} onChange={(e) => setForm({ ...form, tipo_alvo: e.target.value })}>
              <option value="Todos">Todos</option>
              <option value="Aprendizes">Aprendizes</option>
              <option value="Empresas">Empresas</option>
              <option value="Instrutores">Instrutores</option>
            </select>

            <select value={form.prioridade} onChange={(e) => setForm({ ...form, prioridade: e.target.value })}>
              <option value="Normal">Normal</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>

            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="Publicado">Publicado</option>
              <option value="Rascunho">Rascunho</option>
              <option value="Expirado">Expirado</option>
            </select>

            <textarea placeholder="Descrição Detalhada" rows="5" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />

            <div className="modal-buttons">
              <button onClick={salvar}>Salvar</button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VISUALIZAR */}
      {visualizando && (
        <div className="modal-bg">
          <div className="modal">
            <h2>{visualizando.titulo}</h2>
            <p><strong>Alvo:</strong> {visualizando.tipo_alvo}</p>
            <p><strong>Conteúdo:</strong> {visualizando.conteudo}</p>
            <p><strong>Prioridade:</strong> {visualizando.prioridade}</p>
            <p><strong>Status:</strong> {visualizando.status}</p>
            <p><strong>Descrição:</strong> {visualizando.descricao}</p>
            <div className="modal-buttons">
              <button onClick={() => setVisualizando(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}