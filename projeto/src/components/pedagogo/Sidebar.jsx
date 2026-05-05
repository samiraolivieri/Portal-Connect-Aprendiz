import { Link, useLocation } from 'react-router-dom';
import '../../styles/sidebarPedagogo.css';
import logo from '../../assets/logocompletaconnect2.png';

import {
  FaUsers,
  FaCheckCircle,
  FaBoxOpen
} from 'react-icons/fa';

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
  <li><FaUsers /> Dashboard</li>
</Link>

<Link to="/pedagogo/gerirturmas" className={location.pathname === "/pedagogo/gerirturmas" ? "active" : ""}>
  <li><FaUsers /> Gerir Turmas</li>
</Link>

<Link to="/pedagogo/justificativas" className={location.pathname === "/pedagogo/justificativas" ? "active" : ""}>
  <li><FaCheckCircle /> Validar Atestados</li>
</Link>

<Link to="/pedagogo/publicarmaterial" className={location.pathname === "/pedagogo/publicarmaterial" ? "active" : ""}>
  <li><FaBoxOpen /> Publicar Material</li>
</Link>

        </ul>
      </nav>
    </aside>
  );
};

export default SidebarPedagogo;