import React from 'react';
import './ActivityCard.css';
import { FaClock, FaFileAlt, FaClipboardList } from 'react-icons/fa';

const icones = {
  prazo: <FaClock />,
  documento: <FaFileAlt />,
  pesquisa: <FaClipboardList />,
};

const ActivityCard = ({ titulo, status, urgencia, tipo, acao, largura }) => {
  return (
    <div className={`activity-card urgencia-${urgencia}`}
    style={{ width: `${largura}px` }}
    >
      <div className="card-icone">
        {icones[tipo] || <FaFileAlt />}
      </div>
      <div className="card-body">
        <span className={`badge-urgencia badge-${urgencia}`}>
          {urgencia === 'alta' ? 'Urgente' : urgencia === 'media' ? 'Pendente' : 'Novo'}
        </span>
        <p className="card-titulo">{titulo}</p>
        <p className="card-status">{status}</p>
      </div>
      <button className="card-btn">
        {acao}
      </button>
    </div>
  );
};

export default ActivityCard;