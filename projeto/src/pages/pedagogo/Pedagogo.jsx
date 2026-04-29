import { useState, useEffect } from "react";
import "../../styles/pedagogo.css";

import Header from "../../components/pedagogo/Header";
import Sidebar from "../../components/pedagogo/Sidebar";
import TurmaCard from "../../components/pedagogo/TurmaCard";

export default function Pedagogo() {
  const [abrirComunicado, setAbrirComunicado] = useState(false);
  const [abrirMaterial, setAbrirMaterial] = useState(false);
  const [abrirPendencias, setAbrirPendencias] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const turmaId = user?.turma_id;
  // 🔥 NOVOS STATES
  const [comunicados, setComunicados] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    alunos: 0,
    presenca: 0,
    materiais: 0
  });
  const [busca, setBusca] = useState("");
  const [resultadoBusca, setResultadoBusca] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [tituloMaterial, setTituloMaterial] = useState("");
  const [descricaoMaterial, setDescricaoMaterial] = useState("");
  const [linkMaterial, setLinkMaterial] = useState("");

  const buscar = async (valor) => {
    setBusca(valor);
  
    // 🔥 evita chamada vazia
    if (valor.trim() === "") {
      setResultadoBusca([]);
      return;
    }
  
    try {
      const res = await fetch(
        `http://localhost:5000/api/pedagogo/buscar/${valor}`
      );
  
      const data = await res.json();
  
      setResultadoBusca(data);
    } catch (err) {
      console.error(err);
    }
  };

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  // 🚀 CARREGAR DADOS AO ABRIR
  useEffect(() => {
    buscarComunicados();
    buscarEstatisticas();
    buscarMateriais(); // 👈 NOVO
  }, []);

  // 📢 BUSCAR COMUNICADOS
  const buscarComunicados = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/pedagogo/comunicados");
      const data = await res.json();
      setComunicados(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 📊 BUSCAR ESTATÍSTICAS
  const buscarEstatisticas = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const turmaId = user?.turma_id;
  
      const res = await fetch(
        `http://localhost:5000/api/pedagogo/estatisticas?turma_id=${turmaId}`
      );
  
      const data = await res.json();
      setEstatisticas(data);
  
    } catch (err) {
      console.error(err);
    }
  };

  // 🟢 PUBLICAR COMUNICADO
  const publicarComunicado = async () => {
    try {
      await fetch("http://localhost:5000/api/pedagogo/comunicado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo,
          conteudo,
          autor_id: 3
        })
      });

      setAbrirComunicado(false);
      setTitulo("");
      setConteudo("");

      buscarComunicados(); // 🔄 atualiza lista
    } catch (err) {
      console.error(err);
    }
  };
  const buscarMateriais = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const turmaId = user?.turma_id;
  
      const res = await fetch(
        `http://localhost:5000/api/pedagogo/materiais?turma_id=${turmaId}`
      );
  
      const data = await res.json();
      setMateriais(data);
  
    } catch (err) {
      console.error(err);
    }
  };


  const publicarMaterial = async () => {
    try {
      await fetch("http://localhost:5000/api/pedagogo/materiais", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo: tituloMaterial,
          descricao: descricaoMaterial,
          link_material: linkMaterial,
          turma_id: 1 // 🔥 depois você pode deixar dinâmico
        })
      });
  
      // limpar
      setTituloMaterial("");
      setDescricaoMaterial("");
      setLinkMaterial("");
  
      setAbrirMaterial(false);
  
      // 🔄 atualizar lista
      buscarMateriais();
  
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="pedagogo">
      <Header />

      <div className="main">
        <Sidebar />

        <div className="content">
          <TurmaCard />

          <div className="box busca-box">
            <h3>🔎 Buscar Aprendiz</h3>
            <input
            type="text"
            placeholder="Digite o nome do aluno..."
            className="inputBusca"
            value={busca}
            onChange={(e) => buscar(e.target.value)}
            />
          </div>

          <div className="resultadoBusca">
          {resultadoBusca.map((aluno) => (
          <div key={aluno.id} className="itemBusca">
          👤 {aluno.nome}
          </div>
          ))}
          </div>
          
          <div className="dashboard-grid">

            {/* 📢 COMUNICADOS DINÂMICO */}
            <div className="box">
              <h3>📢 Comunicados</h3>

            {/* FIXOS */}
            <p>• Reunião pedagógica sexta-feira</p>
            <p>• Entrega dos boletins até dia 30</p>

              {/* DINÂMICOS */}
              {comunicados.map((c, i) => (
  <div key={i} className="comunicadoItem">
    <p><strong>• {c.titulo}</strong></p>
    <p>{c.conteudo}</p>
    <small>
      {new Date(c.data_publicacao).toLocaleDateString()}
    </small>
  </div>
))}
              <button
                className="miniBtn"
                onClick={() => setAbrirComunicado(true)}
              >
                Novo comunicado
              </button>
            </div>

            {/* 📅 CRONOGRAMA (fixo por enquanto) */}
            <div className="box">
              <h3>📅 Cronograma</h3>
              <p>• React - 20/04</p>
              <p>• Banco de Dados - 28/04</p>
              <p>• Projeto Final - 05/05</p>
            </div>

            {/* 📊 ESTATÍSTICAS DINÂMICO */}
            <div className="box">
              <h3>📊 Estatísticas</h3>
              <p>👥 {estatisticas.alunos} alunos</p>
              <p>
                📈{" "}
                {estatisticas.presenca
                  ? estatisticas.presenca.toFixed(1)
                  : 0}
                % presença
              </p>
              <p>📚 {estatisticas.materiais} materiais enviados</p>
            </div>

            {/* 📚 MATERIAIS */}
            <div className="box">
              <h3>📚 Materiais Publicados</h3>
              {materiais.map((m) => (
  <div key={m.id}>
    <p>📚 {m.titulo}</p>
    {m.link_material && (
      <a href={m.link_material} target="_blank">
        Abrir material
      </a>
    )}
  </div>
))}
              <button
                className="miniBtn"
                onClick={() => setAbrirMaterial(true)}
              >
                Publicar novo
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 📢 POPUP COMUNICADO */}
      {abrirComunicado && (
        <div className="overlay">
          <div className="modal">
            <h2>Novo Comunicado</h2>

            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <textarea
              placeholder="Digite o comunicado"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
            ></textarea>

            <div className="acoesModal">
              <button className="miniBtn" onClick={publicarComunicado}>
                Publicar
              </button>

              <button
                className="fecharBtn"
                onClick={() => setAbrirComunicado(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📚 POPUP MATERIAL */}
      {abrirMaterial && (
        <div className="overlay">
          <div className="modal">
            <h2>Publicar Material</h2>

            <input
  type="text"
  placeholder="Título do material"
  value={tituloMaterial}
  onChange={(e) => setTituloMaterial(e.target.value)}
/>

<textarea
  placeholder="Descrição"
  value={descricaoMaterial}
  onChange={(e) => setDescricaoMaterial(e.target.value)}
></textarea>

<input
  type="text"
  placeholder="Link (opcional)"
  value={linkMaterial}
  onChange={(e) => setLinkMaterial(e.target.value)}
/>

            <div className="acoesModal">
            <button className="miniBtn" onClick={publicarMaterial}>
  Enviar
</button>

              <button
                className="fecharBtn"
                onClick={() => setAbrirMaterial(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⚠ POPUP PENDÊNCIAS */}
      {abrirPendencias && (
        <div className="overlay">
          <div className="modal">
            <h2>⚠ Pendências do Sistema</h2>

            <div className="pendenciaItem">
              <span>João - Falta aguardando validação</span>
              <button className="miniBtn">Aprovar</button>
            </div>

            <div className="pendenciaItem">
              <span>Maria - Boletim pendente</span>
              <button className="miniBtn">Lançar</button>
            </div>

            <div className="pendenciaItem">
              <span>Pedro - Frequência baixa</span>
              <button className="miniBtn">Ver</button>
            </div>

            <div className="acoesModal">
              <button
                className="fecharBtn"
                onClick={() => setAbrirPendencias(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}