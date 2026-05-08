import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import './Sidebar.css';
import logo from '../../assets/logocompletaconnect2.png';
import { FaThLarge, FaFileAlt, FaBullhorn, FaBriefcase } from 'react-icons/fa';
import { BiSolidReport } from "react-icons/bi";
import { GrWorkshop } from "react-icons/gr";

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Portal Connect Logo" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav">
      <ul>
          {/* Usamos o Link no lugar de <li> comum para não recarregar a página */}
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
            <li><FaThLarge /> Dashboard</li>
          </Link>
          
          <Link to="/boletim" className={location.pathname === "/boletim" ? "active" : ""}>
            <li><BiSolidReport /> Boletim/Frequência</li>
          </Link>
          
          <Link to="/justificativas" className={location.pathname === "/justificativas" ? "active" : ""}>
            <li><FaFileAlt /> Justificativas</li>
          </Link>

          <Link to="/mural" className={location.pathname === "/mural" ? "active" : ""}>
            <li><FaBullhorn /> Mural de Avisos</li>
          </Link>
          <Link to="/carreiras" className={location.pathname === "/carreiras" ? "active" : ""}>
            <li><GrWorkshop /> Portal Carreiras</li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;