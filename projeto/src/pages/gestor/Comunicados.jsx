import React, { useState } from "react";
import "../../styles/comunicados.css";
import {
  FaBullhorn,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye
} from "react-icons/fa";

export default function Comunicados() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");

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
    },
    {
      id: 3,
      titulo: "Treinamento obrigatório NR10",
      categoria: "Segurança",
      prioridade: "Alta",
      data: "10/04/2026",
      status: "Expirado",
      descricao: "Participação obrigatória no treinamento.",
    }
  ]);

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

  function abrirNovo() {
    setModoEdicao(false);
    setForm({
      id: null,
      titulo: "",
      categoria: "",
      prioridade: "Normal",
      status: "Publicado",
      descricao: "",
    });
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
      setComunicados(
        comunicados.map((item) =>
          item.id === form.id ? form : item
        )
      );
    } else {
      const novo = {
        ...form,
        id: Date.now(),
        data: new Date().toLocaleDateString("pt-BR")
      };

      setComunicados([...comunicados, novo]);
    }

    setMostrarModal(false);
  }

  function excluir(id) {
    const confirmar = window.confirm("Deseja excluir este comunicado?");
    if (confirmar) {
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

  if (filtro === "Publicados") {
    lista = lista.filter((item) => item.status === "Publicado");
  }

  if (filtro === "Rascunhos") {
    lista = lista.filter((item) => item.status === "Rascunho");
  }

  if (filtro === "Urgentes") {
    lista = lista.filter((item) => item.prioridade === "Alta");
  }

  if (filtro === "Expirados") {
    lista = lista.filter((item) => item.status === "Expirado");
  }

  return (
    <div className="comunicados-page">

      <header className="com-topo">
        <h1>
          <FaBullhorn /> Comunicados Oficiais
        </h1>

        <button className="btn-novo" onClick={abrirNovo}>
          <FaPlus /> Criar Comunicado
        </button>
      </header>

      {/* Busca */}
      <section className="barra-busca">
        <FaSearch />
        <input
          type="text"
          placeholder="Buscar comunicado..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </section>

      {/* Filtros */}
      <section className="filtros">
        {["Todos", "Publicados", "Rascunhos", "Urgentes", "Expirados"].map(
          (item) => (
            <button
              key={item}
              className={filtro === item ? "ativo" : ""}
              onClick={() => setFiltro(item)}
            >
              {item}
            </button>
          )
        )}
      </section>

      {/* Tabela */}
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

                <td>
                  <span className={`badge ${corPrioridade(item.prioridade)}`}>
                    {item.prioridade}
                  </span>
                </td>

               
                <td>{item.data}</td>

                <td className="acoes">
                  <button onClick={() => setVisualizando(item)}>
                    <FaEye />
                  </button>

                  <button onClick={() => editar(item)}>
                    <FaEdit />
                  </button>

                  <button onClick={() => excluir(item.id)}>
                    <FaTrash />
                  </button>
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
            <h2>
              {modoEdicao ? "Editar Comunicado" : "Novo Comunicado"}
            </h2>

            <input
              type="text"
              placeholder="Título"
              value={form.titulo}
              onChange={(e) =>
                setForm({ ...form, titulo: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Categoria"
              value={form.categoria}
              onChange={(e) =>
                setForm({ ...form, categoria: e.target.value })
              }
            />

            <select
              value={form.prioridade}
              onChange={(e) =>
                setForm({ ...form, prioridade: e.target.value })
              }
            >
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Normal">Normal</option>
            </select>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="Publicado">Publicado</option>
              <option value="Rascunho">Rascunho</option>
              <option value="Expirado">Expirado</option>
            </select>

            <textarea
              placeholder="Descrição"
              rows="5"
              value={form.descricao}
              onChange={(e) =>
                setForm({ ...form, descricao: e.target.value })
              }
            />

            <div className="modal-buttons">
              <button onClick={salvar}>Salvar</button>
              <button onClick={() => setMostrarModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VISUALIZAR */}
      {visualizando && (
        <div className="modal-bg">
          <div className="modal">
            <h2>{visualizando.titulo}</h2>

            <p><strong>Categoria:</strong> {visualizando.categoria}</p>
            <p><strong>Prioridade:</strong> {visualizando.prioridade}</p>
            <p><strong>Status:</strong> {visualizando.status}</p>
            <p><strong>Data:</strong> {visualizando.data}</p>

           

            <p><strong>Descrição:</strong></p>
            <p>{visualizando.descricao}</p>

            <div className="modal-buttons">
              <button onClick={() => setVisualizando(null)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}