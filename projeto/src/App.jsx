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
import Pedagogo from "./pages/pedagogo/Pedagogo.jsx";
import SidebarPedagogo from './components/pedagogo/Sidebar.jsx';
function App() {
  const location = useLocation();

  // Definição das condições de visualização
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";
  const isGestorPage = location.pathname.startsWith("/gestor");
  const isPedagogoPage = location.pathname.startsWith("/pedagogo");

  // Ajuste de layout para o pedagogo (conforme sua lógica anterior)
const layoutClass = "app-layout";
const contentClass = "content";

  return (
    <div className={layoutClass}>
      {/* Lógica da Sidebar: Se não for login, escolhe qual mostrar */}
      {!isLoginPage && (
  isGestorPage ? <SidebarGestor /> :
  isPedagogoPage ? <SidebarPedagogo /> :
  <Sidebar />
)}

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
          <Route path="/gestor/contracheque" element={<Contracheque />} />
          <Route path="/gestor/justificativas" element={<JustificativasGestor />} />
          <Route path="/gestor/comunicados" element={<Comunicados />} />

          {/* Rotas do Pedagogo */}
          <Route path="/pedagogo/" element={<Pedagogo />} />         
          <Route path="/pedagogo/gerirturmas" element={<GerirTurmas />} />
          <Route path="/pedagogo/publicarmaterial" element={<PublicarMaterial />} />
          <Route path="/pedagogo/justificativas" element={<JustificativasPedagogo />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;