import { useState, useEffect } from "react";

export default function TurmaCard() {
  const [abrirAbono, setAbrirAbono] = useState(false);
  const [abrirPendencias, setAbrirPendencias] = useState(false);

  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  // 🔥 AGORA VEM DO BANCO
  const [justificativas, setJustificativas] = useState([]);

  // 🔥 CARREGAR DO BACKEND
  useEffect(() => {
    carregarJustificativas();
  }, []);

  const carregarJustificativas = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/pedagogo/justificativas");
      const data = await res.json();
      setJustificativas(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 ABRIR MODAL COM DADO REAL
  function abrirValidacao(justificativa) {
    setAlunoSelecionado(justificativa);
    setAbrirAbono(true);
  }

  // 🔥 APROVAR
  const aprovar = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/pedagogo/justificativas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "aprovado" })
      });

      setAbrirAbono(false);
      setAlunoSelecionado(null);
      carregarJustificativas();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 RECUSAR
  const recusar = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/pedagogo/justificativas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "recusado" })
      });

      setAbrirAbono(false);
      setAlunoSelecionado(null);
      carregarJustificativas();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="card turma-card">
        <h2>TURMA: DESENV. SISTEMAS (SENAI)</h2>

        <div className="turma-body">

          {/* LISTA REAL */}
          <div className="listaAlunos">
  {justificativas.length === 0 && <p>Sem pendências 👍</p>}

  {justificativas
    .filter((j) => j.status === "pendente")
    .map((j) => (
      <div
        key={j.id}
        className={`itemAluno ${alunoSelecionado?.id === j.id ? "ativo" : ""}`}
        onClick={() => abrirValidacao(j)}
      >
        👤 {j.nome}

        <span className={`status ${j.status?.toLowerCase() || "pendente"}`}>
          {j.status || "pendente"}
        </span>
      </div>
  ))}
</div>

          {/* PAINEL */}
          <div className="painelAcao">
            <h3>VALIDAR JUSTIFICATIVA</h3>

            {alunoSelecionado ? (
              <>
                <p><strong>Aluno:</strong></p>
                <p>{alunoSelecionado.nome}</p>

                <p><strong>Título:</strong></p>
                <p>{alunoSelecionado.titulo}</p>

              </>
            ) : (
              <p style={{ fontSize: "12px", color: "#666" }}>
                Clique em um aluno para validar
              </p>
            )}

            <button
              className="botaoSecundario"
              onClick={() => setAbrirPendencias(true)}
            >
              VER PENDÊNCIAS
            </button>
          </div>

        </div>
      </div>

      {/* POPUP ABONAR */}
      {abrirAbono && alunoSelecionado && (
        <div className="overlay">
          <div className="modal">
            <h2>Validar Justificativa</h2>

            <p><strong>Aluno:</strong> {alunoSelecionado.nome}</p>
            <p><strong>Título:</strong> {alunoSelecionado.titulo}</p>

            <div className="acoesModal">
              <button
                className="miniBtn"
                onClick={() => aprovar(alunoSelecionado.id)}
              >
                Aprovar
              </button>

              <button
                className="miniBtn"
                onClick={() => recusar(alunoSelecionado.id)}
              >
                Recusar
              </button>

              <button
                className="fecharBtn"
                onClick={() => setAbrirAbono(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP PENDÊNCIAS */}
      {abrirPendencias && (
        <div className="overlay">
          <div className="modal">
            <h2>Pendências da Turma</h2>

            {justificativas.map((j) => (
              <p key={j.id}>• {j.nome} - {j.titulo}</p>
            ))}

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
    </>
  );
}