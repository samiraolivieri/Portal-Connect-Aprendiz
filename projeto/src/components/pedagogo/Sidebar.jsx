import { Link, useLocation } from 'react-router-dom';
import '../../styles/sidebarPedagogo.css';
import logo from '../../assets/logocompletaconnect2.png';

import {
  FaUsers,
  FaCheckCircle,
  FaBoxOpen,
  FaThLarge,
  FaFileAlt
} from 'react-icons/fa';
import { MdHomeWork } from "react-icons/md";

const SidebarPedagogo = () => {
  const location = useLocation();

  return (
    <aside className="sidebar sidebar-pedagogo">

      <div className="logo-container">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>

      <nav className="sidebar-nav">
        <ul>

          <Link to="/pedagogo" className={location.pathname === "/pedagogo" ? "active" : ""}>
            <li><FaThLarge /> Dashboard</li>
          </Link>

          <Link to="/pedagogo/gerirturmas" className={location.pathname === "/pedagogo/gerirturmas" ? "active" : ""}>
            <li><FaUsers /> Gerir Turmas</li>
          </Link>

          <Link to="/pedagogo/justificativas" className={location.pathname === "/pedagogo/justificativas" ? "active" : ""}>
            <li><FaFileAlt /> Validar Justificativa</li>
          </Link>

          <Link to="/pedagogo/publicarmaterial" className={location.pathname === "/pedagogo/publicarmaterial" ? "active" : ""}>
            <li><FaBoxOpen /> Publicar Material</li>
          </Link>
          <Link to="/pedagogo/visitas" className={location.pathname === "/pedagogo/visitas" ? "active" : ""}>
            <li><MdHomeWork /> Validar Visitas</li>
          </Link>

        </ul>
      </nav>
    </aside>
  );
};

export default SidebarPedagogo;