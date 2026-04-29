import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import './Sidebar.css';
import logo from '../../assets/logocompletaconnect2.png';
import { FaThLarge, FaFileAlt, FaBullhorn, FaBriefcase } from 'react-icons/fa';

const SidebarGestor = () => {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Portal Connect Logo" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav">
      <ul>
         
          <Link to="/gestor/dashboard" className={location.pathname === "/gestor/dashboard" ? "active" : ""}>
            <li><FaThLarge /> Visão Geral</li>
          </Link>
          
          <Link to="/gestor/justificativas" className={location.pathname === "/atestados" ? "active" : ""}>
            <li><FaFileAlt />Validar Atestados</li>
          </Link>
          
          <Link to="/gestor/desempenho" className={location.pathname === "/gestor/desempenho" ? "active" : ""}>
            <li><FaBriefcase /> Desempenho</li>
          </Link>

          <Link to="comunicados" className={location.pathname === "/comunicados" ? "active" : ""}>
            <li><FaBullhorn /> Comunicados Oficiais</li>
          </Link>
          <Link to="/gestor/contracheques" className={location.pathname === "/contracheques" ? "active" : ""}>
            <li><FaFileAlt /> Contracheques</li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarGestor;