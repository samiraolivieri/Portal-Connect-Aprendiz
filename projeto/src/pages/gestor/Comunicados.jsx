import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/comunicados.css";
import { FaBullhorn, FaPlus, FaSearch, FaEdit, FaTrash, FaEye } from "react-icons/fa";

// Verifique se esta URL está correta de acordo com seu arquivo de rotas
const API_URL = "http://localhost:5000/api/comunicados/comunicados";

export default function Comunicados() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [comunicados, setComunicados] = useState([]);

  // Pegando o ID do usuário logado corretamente
  const usuarioLogado = localStorage.getItem("usuario");
  const usuarioObj = usuarioLogado ? JSON.parse(usuarioLogado) : null;
  const userId = usuarioObj ? usuarioObj.id : null;

  // Estado inicial ajustado para as colunas do banco
  const estadoInicial = {
    id: null,
    autor_id: userId,
    titulo: "",
    conteudo: "",     // Representa o resumo/categoria[cite: 2]
    tipo_alvo: "Todos", // Nome correto da coluna[cite: 2]
    prioridade: "Normal",
    status: "Publicado",
    descricao: "",
  };

  const [form, setForm] = useState(estadoInicial);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [visualizando, setVisualizando] = useState(null);

  

  const carregarComunicados = async () => {
    try {
      const response = await axios.get(API_URL);
      setComunicados(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };
  useEffect(() => {
    carregarComunicados();
  }, []);

  function abrirNovo() {
    setModoEdicao(false);
    setForm(estadoInicial); // Resetando com o ID do autor atual
    setMostrarModal(true);
  }

  function editar(item) {
    setModoEdicao(true);
    setForm(item);
    setMostrarModal(true);
  }

  async function salvar() {
    // Validação básica
    if (!form.titulo || !form.conteudo || !form.descricao) {
      alert("Preencha os campos obrigatórios (Título, Conteúdo Breve e Descrição).");
      return;
    }

    if (!userId) {
      alert("Erro: Usuário não identificado. Por favor, faça login novamente.");
      return;
    }

    try {
      // Garantindo que o autor_id vá no objeto de envio[cite: 2]
      const dadosParaEnviar = { ...form, autor_id: userId };

      if (modoEdicao) {
        await axios.put(`${API_URL}/${form.id}`, dadosParaEnviar);
      } else {
        await axios.post(API_URL, dadosParaEnviar);
      }
      
      carregarComunicados();
      setMostrarModal(false);
      setForm(estadoInicial);
      alert("Sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar no banco. Verifique o console.");
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

  // Lógica de filtragem atualizada para as novas colunas[cite: 2]
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