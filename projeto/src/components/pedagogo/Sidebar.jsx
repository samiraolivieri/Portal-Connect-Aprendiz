import { Link, useLocation } from 'react-router-dom';
import '../../styles/sidebarPedagogo.css';
import logo from '../../assets/logocompletaconnect2.png';

import {
  FaUsers,
  FaFileAlt,
  FaCheckCircle,
  FaClipboardList,
  FaBoxOpen
} from 'react-icons/fa';

const SidebarPedagogo = () => {
  const location = useLocation();

  return (
    <aside className="sidebar-pedagogo">
      
      <div className="logo-container">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>

      <nav className="sidebar-nav">
        <ul>

          <Link to="/pedagogo" className={location.pathname === "/pedagogo" ? "active" : ""}>
            <li><FaUsers /> Gerir Turmas</li>
          </Link>

          <Link to="/pedagogo/info" className={location.pathname === "/pedagogo/info" ? "active" : ""}>
            <li><FaFileAlt /> Inserir Info Acadêmicas</li>
          </Link>

          <Link to="/pedagogo/atestados" className={location.pathname === "/pedagogo/atestados" ? "active" : ""}>
            <li><FaCheckCircle /> Validar Atestados</li>
          </Link>

          <Link to="/pedagogo/abonar" className={location.pathname === "/pedagogo/abonar" ? "active" : ""}>
            <li><FaClipboardList /> Abonar Faltas</li>
          </Link>

          <Link to="/pedagogo/material" className={location.pathname === "/pedagogo/material" ? "active" : ""}>
            <li><FaBoxOpen /> Publicar Material</li>
          </Link>

        </ul>
      </nav>
    </aside>
  );
};

export default SidebarPedagogo;