import { useState, useEffect } from "react";
import "./pedagogo.css";




export default function Pedagogo() {
  
  const [abrirComunicado, setAbrirComunicado] = useState(false);
  const [abrirMaterial, setAbrirMaterial] = useState(false);
  const [abrirPendencias, setAbrirPendencias] = useState(false);
  const [justificativas, setJustificativas] = useState([]);

  // ✅ CORRIGIDO AQUI
 const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { 
  id: 0, 
  nome: 'Pedagogo' 
};

 const turmaId = usuarioLogado?.turma_id;

console.log("USER:", usuarioLogado);
console.log("TURMA ID:", turmaId);
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

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  const carregarJustificativas = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/pedagogo/justificativas?turma_id=${turmaId}`
    );

    const data = await res.json();

    console.log("JUSTIFICATIVAS FRONT:", data);

    setJustificativas(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error(err);
    setJustificativas([]);
  }
};
useEffect(() => {
  if (!turmaId) return;
  carregarJustificativas();
}, [turmaId]);

  // 🔎 Buscar aluno
  const buscar = async (valor) => {
    setBusca(valor);

    if (valor.trim() === "") {
      setResultadoBusca([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/pedagogo/buscar/${valor}?turma_id=${turmaId}`)
      ;
      const data = await res.json();
        console.log("RESULTADO:", data);
      setResultadoBusca(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🚀 Carregar dados
  useEffect(() => {
  if (!turmaId) return;

  buscarComunicados();
  buscarEstatisticas();
  buscarMateriais();
}, [turmaId]);

  // 📢 Comunicados
 const buscarComunicados = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/pedagogo/comunicados");
    const data = await res.json();


    setComunicados(data);
  } catch (err) {
    console.error(err);
  }
};

  // 📊 Estatísticas
  const buscarEstatisticas = async () => {
  try {
    console.log("BUSCANDO ESTATISTICAS - TURMA:", turmaId);

    const res = await fetch(
      `http://localhost:5000/api/pedagogo/estatisticas?turma_id=${turmaId}`
    );

    const data = await res.json();

    console.log("ESTATISTICAS RECEBIDAS:", data);

    setEstatisticas(data);
  } catch (err) {
    console.error("ERRO ESTATISTICAS:", err);
  }
};

  // 📚 Materiais
  const buscarMateriais = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/pedagogo/materiais?turma_id=${turmaId}`
      );
      const data = await res.json();
      setMateriais(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 📢 Publicar comunicado
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
          autor_id: usuarioLogado?.id // 🔥 agora dinâmico
        })
      });

      setAbrirComunicado(false);
      setTitulo("");
      setConteudo("");
      buscarComunicados();
    } catch (err) {
      console.error(err);
    }
  };

  // 📚 Publicar material
  const publicarMaterial = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/pedagogo/materiais", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo: tituloMaterial,
        descricao: descricaoMaterial,
        link_material: linkMaterial,
        turma_id: turmaId
      })
    });

    const data = await res.json();
    console.log("RESPOSTA:", data); // 👈 debug

    // limpar campos
    setTituloMaterial("");
    setDescricaoMaterial("");
    setLinkMaterial("");

    setAbrirMaterial(false);

    // 🔥 ATUALIZA NA TELA
    buscarMateriais();

  } catch (err) {
    console.error("ERRO AO PUBLICAR MATERIAL:", err);
  }
};

  // 🛑 proteção extra
  if (!usuarioLogado) {
    return <div>Carregando usuário...</div>;
  }

  return (
    
  <div className="pedagogo">

    <div className="topo-pedagogo">
      <h2>Bem-vindo, {usuarioLogado?.nome}</h2>
    </div>

     

      <div className="main">
       <div className="content">

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
  <div className="painelAcao">
    <h3>VALIDAR JUSTIFICATIVA</h3>

    <p style={{ fontSize: "12px", color: "#666" }}>
      Clique para visualizar pendências
    </p>

    <button
      className="botaoSecundario"
      onClick={() => setAbrirPendencias(true)}
    >
      VER PENDÊNCIAS ({justificativas.length})
    </button>
  </div>
</div>

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
            <div className="box">
              <h3>📢 Comunicados</h3>

              {comunicados.map((c, i) => (
                <div key={i}>
                  <p><strong>{c.titulo}</strong></p>
                  <p>{c.conteudo}</p>
                </div>
              ))}

              <button 
  className="miniBtn"
  onClick={() => setAbrirComunicado(true)}
>
  Novo comunicado
</button>
            </div>

            <div className="box">
  <h3>📊 Estatísticas</h3>

  <div style={{ marginTop: "10px" }}>
    <p>
      👥 Alunos: <strong>{estatisticas.alunos || 0}</strong>
    </p>

    <p>
      📈 Presença:{" "}
      <strong>
        {estatisticas.presenca
          ? Number(estatisticas.presenca).toFixed(1)
          : 0}
        %
      </strong>
    </p>

    <p>
      📚 Materiais: <strong>{estatisticas.materiais || 0}</strong>
    </p>
  </div>
</div>

            <div className="box">
              <h3>📚 Materiais</h3>
              {materiais.map((m) => (
                <div key={m.id}>
                  <p>{m.titulo}</p>
                </div>
              ))}

              <button 
  className="miniBtn"
  onClick={() => setAbrirMaterial(true)}
>
  Publicar material
</button>
            </div>
          </div>
        </div>
      </div>
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
        placeholder="Conteúdo"
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
      />

      <div className="acoesModal">
        <button className="fecharBtn" onClick={() => setAbrirComunicado(false)}>
          Cancelar
        </button>

        <button className="miniBtn" onClick={publicarComunicado}>
          Publicar
        </button>
      </div>
    </div>
  </div>
)}
{abrirMaterial && (
  <div className="overlay">
    <div className="modal">
      <h2>Novo Material</h2>

      <input
        type="text"
        placeholder="Título"
        value={tituloMaterial}
        onChange={(e) => setTituloMaterial(e.target.value)}
      />

      <textarea
        placeholder="Descrição"
        value={descricaoMaterial}
        onChange={(e) => setDescricaoMaterial(e.target.value)}
      />

      <input
        type="text"
        placeholder="Link do material"
        value={linkMaterial}
        onChange={(e) => setLinkMaterial(e.target.value)}
      />

      <div className="acoesModal">
        <button className="fecharBtn" onClick={() => setAbrirMaterial(false)}>
          Cancelar
        </button>

        <button className="miniBtn" onClick={publicarMaterial}>
          Publicar
        </button>
      </div>
    </div>
  </div>
)}
{abrirPendencias && (
  <div className="overlay">
    <div className="modal">
      <h2>Pendências da Turma</h2>

      {justificativas.length === 0 ? (
        <p>Sem pendências 👍</p>
      ) : (
        justificativas.map((j) => (
          <p key={j.id}>
            • {j.nome} - {j.titulo}
          </p>
        ))
      )}

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