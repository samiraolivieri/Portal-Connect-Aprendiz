import React from 'react';
import './ContatoPopup.css';
import { FaTimes, FaEnvelope } from 'react-icons/fa';

const ContatoPopup = ({ contato, onClose }) => {
  if (!contato) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={e => e.stopPropagation()}>

        <button className="popup-fechar" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="popup-header">
          <div className="popup-avatar">
            {contato.responsavel.charAt(0)}
          </div>
          <div>
            <h2 className="popup-nome">{contato.responsavel}</h2>
            <span className="popup-setor">{contato.nome_setor}</span>
          </div>
        </div>

        <div className="popup-info">
          <div className="popup-linha">
            <FaEnvelope className="popup-icone" />
            <a href={`mailto:${contato.email}`}>{contato.email}</a>
          </div>
        </div>

        <div className="popup-acoes">
          <a href={`mailto:${contato.email}`} className="btn-contato btn-email">
            Enviar E-mail
          </a>
        </div>

      </div>
    </div>
  );
};

export default ContatoPopup;