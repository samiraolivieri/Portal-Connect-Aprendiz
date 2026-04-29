import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/aprendiz/Login.jsx'; 
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Dashboard from './pages/aprendiz/Dashboard.jsx';
import DashboardGestor from './pages/gestor/DashboardGestor.jsx';
// Importe as outras páginas que vamos criar (mesmo que vazias agora)
// import Boletim from './pages/Boletim'; 
import './App.css';
import Desempenho from './pages/gestor/Desempenho.jsx';

import Mural from './pages/aprendiz/Mural.jsx';
import Carreiras from './pages/aprendiz/Carreiras.jsx';
import Justificativas from './pages/aprendiz/Justificativas.jsx'
import Boletim from './pages/aprendiz/Boletim.jsx';


import SidebarGestor from './components/Sidebar/SidebarGestor.jsx';
import Boletim from './pages/aprendiz/Boletim.jsx'

import JustificativasGestor from './pages/gestor/Justificativas.jsx'
import JustificativasPedagogo from './pages/pedagogo/Justificativas.jsx'
import Login from './pages/aprendiz/Login.jsx'

function App() {

  const location = useLocation(); // Hook para saber em qual URL estamos
 
  // Verificamos se a rota atual é a do login ("/")
  const isLoginPage = location.pathname === "/";
  const isGestorPage = location.pathname.startsWith("/gestor");

  return (
    <div className="app-layout">
    
   
      {!isLoginPage && (
        isGestorPage ? <SidebarGestor /> : <Sidebar />
      )}

      <main className="content">
        <Routes>

            {/* Login */}
            <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/boletim"
            element={<Boletim />}
          />

          <Route
            path="/justificativas"
            element={<Justificativas/>}
          />

          <Route
            path="/mural"
            element={
              <div style={{ color: "black" }}>
                <Mural />
              </div>
            }
          />

          <Route
            path="/carreiras"
            element={
              <div style={{ color: "black" }}>
                <Carreiras />
              </div>
            }
          />

          {/* Novas rotas do Gestor */}
          <Route path="/gestor/dashboard" element={<DashboardGestor />} />
          {/* <Route path="/dashboard-gestor/atestados" element={<Atestados />} /> */}
          <Route path="/gestor/desempenho" element={<Desempenho />} />
          {/* <Route path="/gestor/contracheque" element={<Contracheque />} /> */}
          


            
          <Route
          path='/gestor/justificativas'
          element={<JustificativasGestor/>}
>

          </Route>
          <Route
          path='/pedagogo/justificativas'
          element={<JustificativasPedagogo/>}>

          </Route>
          <Route path='/login' element={<Login/>}></Route>

        </Routes>
      </main>
    </div>
  );
}

export default App;