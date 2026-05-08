import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// --- COMPONENTES ---
import Sidebar from './components/Sidebar/Sidebar.jsx';
import SidebarGestor from './components/Sidebar/SidebarGestor.jsx';

// --- PÁGINAS APRENDIZ ---
import Login from './pages/aprendiz/Login.jsx'; 
import Dashboard from './pages/aprendiz/Dashboard.jsx';
import Mural from './pages/aprendiz/Mural.jsx';
import Carreiras from './pages/aprendiz/Carreiras.jsx';
import Justificativas from './pages/aprendiz/Justificativas.jsx';
import Boletim from './pages/aprendiz/Boletim.jsx';

// --- PÁGINAS GESTOR ---
import DashboardGestor from './pages/gestor/DashboardGestor.jsx';
import Desempenho from './pages/gestor/Desempenho.jsx'; 
import Contracheque from './pages/gestor/Contracheque.jsx';
import JustificativasGestor from './pages/gestor/Justificativas.jsx';
import Comunicados from './pages/gestor/Comunicados.jsx';

// --- PÁGINAS PEDAGOGO ---
import GerirTurmas from './pages/pedagogo/GerirTurmas.jsx';
import PublicarMaterial from './pages/pedagogo/PublicarMaterial.jsx';
import JustificativasPedagogo from './pages/pedagogo/Justificativas.jsx';
import Pedagogo from "./pages/pedagogo/Pedagogo";

function App() {
  const location = useLocation();

  // 1. Identifica se é página de login
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  // 2. Identifica o tipo de usuário pela URL (Melhorado com startsWith simplificado)
  const isGestorRoute = location.pathname.startsWith("/gestor");
  const isPedagogoRoute = location.pathname.startsWith("/pedagogo");

  // 3. Define qual Sidebar exibir
  const renderSidebar = () => {
    if (isLoginPage) return null;
    if (isGestorRoute || isPedagogoRoute) return <SidebarGestor />;
    return <Sidebar />;
  };

  // Ajuste de layout
  const layoutClass = isLoginPage ? "" : "app-layout";
  const contentClass = isLoginPage ? "" : "content";

  return (
    <div className={layoutClass}>
      {renderSidebar()}

      <main className={contentClass}>
        <Routes>
          {/* Rota Inicial / Login */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas do Aprendiz */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/boletim" element={<Boletim />} />
          <Route path="/justificativas" element={<Justificativas />} />
          <Route path="/mural" element={<Mural />} />
          <Route path="/carreiras" element={<Carreiras />} />

          {/* Rotas do Gestor */}
          <Route path="/gestor/dashboard" element={<DashboardGestor />} />
          <Route path="/gestor/desempenho" element={<Desempenho />} />
          <Route path="/gestor/contracheques" element={<Contracheque />} />
          <Route path="/gestor/justificativas" element={<JustificativasGestor />} />
          <Route path="/gestor/comunicados" element={<Comunicados />} />

          {/* Rotas do Pedagogo */}
          <Route path="/pedagogo/dashboard" element={<Pedagogo />} /> {/* Ajustado para manter o padrão /pedagogo/dashboard */}
          <Route path="/pedagogo/gerirturmas" element={<GerirTurmas />} />
          <Route path="/pedagogo/publicarmaterial" element={<PublicarMaterial />} />
          <Route path="/pedagogo/justificativas" element={<JustificativasPedagogo />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;