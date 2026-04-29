import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/mural.css";

/* 🔥 AVISOS FIXOS */
const avisosFixos = [
  {
    id: 1,
    titulo: "Reunião obrigatória",
    descricao: "Alinhamento geral da equipe",
    local: "Sala 3",
    horario: "15/04 às 14h",
    tipo: "info",
    autor: "Administração",
    data: "13/04/2026",
    destaque: true,
    status: "novo"
  },
  {
    id: 2,
    titulo: "Prazo de entrega",
    descricao: "Relatório até 20/04",
    tipo: "urgente",
    autor: "Coordenação",
    data: "12/04/2026",
    status: "novo"
  },
  {
    id: 3,
    titulo: "Feira de profissões",
    descricao: "Evento dia 25/04",
    tipo: "evento",
    autor: "Equipe",
    data: "10/04/2026"
  },
  {
    id: 4,
    titulo: "Manutenção no sistema",
    descricao: "Atualização programada do sistema",
    horario: "18/04 às 22h",
    tipo: "urgente",
    autor: "TI",
    data: "14/04/2026",
    status: "novo"
  },
  {
    id: 5,
    titulo: "Entrega de documentos",
    descricao: "Entrega obrigatória de documentos pendentes",
    local: "Secretaria",
    horario: "Até 19/04",
    tipo: "info",
    autor: "Administração",
    data: "14/04/2026"
  },
  {
    id: 6,
    titulo: "Palestra sobre mercado de trabalho",
    descricao: "Palestra com profissionais da área",
    local: "Auditório",
    horario: "22/04 às 10h",
    tipo: "evento",
    autor: "Coordenação",
    data: "13/04/2026"
  }
];

export default function Mural() {
  const [avisosApi, setAvisosApi] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/comunicados")
      .then((res) => {
        const dadosFormatados = res.data.map((item) => ({
          id: item.id,
          titulo: item.titulo,

          // 🔥 AGORA ACEITA conteudo OU descricao
          descricao: item.descricao || item.conteudo,

          local: item.local,
          horario: item.horario,
          tipo: item.tipo || "info",
          autor: item.autor || "Administração",
          data: item.data || item.data_publicacao,
          destaque: item.destaque,
          status: item.status
        }));

        setAvisosApi(dadosFormatados);
      })
      .catch((err) => {
        console.error("Erro ao buscar avisos:", err);
      });
  }, []);

  const avisos = [...avisosFixos, ...avisosApi];

  return (
    <div className="mural-container">
      <h1 className="titulo">Mural de Avisos</h1>

      {/* Destaque fixo */}
      <div className="aviso destaque">
        🚨 Sistema ficará fora do ar amanhã das 18h às 20h
      </div>

      {/* Avisos importantes */}
      {avisos
        .filter((aviso) => aviso.destaque)
        .map((aviso) => (
          <div key={aviso.id} className="aviso destaque-amarelo">
            📢 <strong>{aviso.titulo}</strong> — {aviso.descricao} <br />
            {aviso.horario && <>⏰ {aviso.horario}</>}
            {aviso.local && <> | 📍 {aviso.local}</>}
          </div>
        ))}

      {/* Lista */}
      <div className="mural-grid">
        {avisos
          .filter((aviso) => !aviso.destaque)
          .map((aviso) => (
            <div key={aviso.id} className={`aviso-card ${aviso.tipo}`}>
              
              <div className="conteudo">
                {aviso.status === "novo" && (
                  <span className="novo">NOVO</span>
                )}

                <h3>{aviso.titulo}</h3>

                <p className="descricao">{aviso.descricao}</p>

                <div className="detalhes">
                  {aviso.local && <span>📍 {aviso.local}</span>}
                  {aviso.horario && <span>⏰ {aviso.horario}</span>}
                </div>
              </div>

              <div className="info">
                <span>👤 {aviso.autor}</span>
                <span>📅 {aviso.data}</span>
              </div>

            </div>
          ))}
      </div>
    </div>
  );
}