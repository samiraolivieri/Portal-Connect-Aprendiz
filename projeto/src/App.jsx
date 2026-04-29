import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Dashboard from './pages/aprendiz/Dashboard.jsx';
import Login from './pages/aprendiz/Login.jsx';
import Mural from './pages/aprendiz/Mural.jsx';
import Carreiras from './pages/aprendiz/Carreiras.jsx';
import Justificativas from './pages/aprendiz/Justificativas.jsx';
import Boletim from './pages/aprendiz/Boletim.jsx';
import Comunicados from './pages/gestor/Comunicados.jsx';
import Pedagogo from "./pages/pedagogo/Pedagogo";
import './App.css';


function App() {
  const location = useLocation();

  const paginaLogin = location.pathname === "/";
  const paginaPedagogo = location.pathname.startsWith("/pedagogo");
  return (
    <div className={paginaPedagogo ? "" : "app-layout"}>
      {/* Só aparece se NÃO estiver no login */}
      {!paginaLogin && !paginaPedagogo && <Sidebar />}
      <main className={paginaPedagogo ? "" : "content"}>    
            <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/boletim" element={<Boletim />} />
          <Route path="/justificativas" element={<Justificativas />} />
          <Route path="/mural" element={<Mural />} />
          <Route path="/carreiras" element={<Carreiras />} />
          <Route path="/comunicados" element={<Comunicados />} />
          <Route path="/pedagogo" element={<Pedagogo />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;