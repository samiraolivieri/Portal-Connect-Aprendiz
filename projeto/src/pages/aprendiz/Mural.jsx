import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/mural.css";
// Adicionado ícones para o modal e botão flutuante
import { FaComments, FaTimes, FaEnvelope } from 'react-icons/fa';

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
  
  // Estados para o Modal de Contatos
  const [showContactModal, setShowContactModal] = useState(false);

  // Lista de contatos suporte padrão do sistema
  const contatosSuporte = [
    { nome: "Sérgio Carvalho", cargo: "Gestor", email: "serginho@empresa.com", tel: "(21) 99999-9999" },
    { nome: "Vilma Nascimento", cargo: "Pedagogia", email: "amaior@ensino.com", tel: "(21) 88888-8888" }
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/api/comunicados")
      .then((res) => {
        const dadosFormatados = res.data.map((item) => ({
          id: item.id,
          titulo: item.titulo,
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

      {/* --- MODAL DE CONTATOS --- */}
      {showContactModal && (
        <div className="contact-overlay active" onClick={() => setShowContactModal(false)}>
          <div className="contact-window" onClick={(e) => e.stopPropagation()}>
            <div className="contact-header">
              <h4>Contatos Responsáveis</h4>
              <button className="btn-close-contact" onClick={() => setShowContactModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="contact-list">
              {contatosSuporte.map((c, index) => (
                <div key={index} className="contact-card">
                  <strong>{c.nome}</strong>
                  <span> | {c.cargo}</span>
                  <div className="contact-actions">
                    <a href={`mailto:${c.email}`} className="action-link mail">
                      <FaEnvelope /> Email
                    </a>
                    <a href={`tel:${c.tel}`} className="action-link phone">{c.tel}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE */}
      <div className="floating-contact" onClick={() => setShowContactModal(true)}>
        <FaComments />
        <span>Contatos</span>
      </div>
    </div>
  );
}