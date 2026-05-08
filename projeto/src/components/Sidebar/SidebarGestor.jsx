import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import './Sidebar.css';
import logo from '../../assets/logocompletaconnect2.png';
import { FaThLarge, FaFileAlt, FaBullhorn, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';

const SidebarGestor = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Portal Connect Logo" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          {/* Link para Visão Geral */}
          <Link to="/gestor/dashboard">
            <li className={location.pathname === "/gestor/dashboard" ? "active" : ""}>
              <FaThLarge /> Visão Geral
            </li>
          </Link>
          
          {/* Link para Validar Atestados */}
          <Link to="/gestor/justificativas">
            <li className={location.pathname === "/gestor/justificativas" ? "active" : ""}>
              <FaFileAlt /> Validar Justificativa
            </li>
          </Link>
          
          {/* Link para Desempenho */}
          <Link to="/gestor/desempenho">
            <li className={location.pathname === "/gestor/desempenho" ? "active" : ""}>
              <FaBriefcase /> Desempenho
            </li>
          </Link>

          {/* Link para Comunicados */}
          <Link to="/gestor/comunicados">
            <li className={location.pathname === "/gestor/comunicados" ? "active" : ""}>
              <FaBullhorn /> Comunicados Oficiais
            </li>
          </Link>

          {/* CORREÇÃO: Link para Contracheque (Singular para bater com o App.jsx) */}
          <Link to="/gestor/contracheque">
            <li className={location.pathname === "/gestor/contracheque" ? "active" : ""}>
              <FaMoneyBillWave /> Contracheque
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarGestor;