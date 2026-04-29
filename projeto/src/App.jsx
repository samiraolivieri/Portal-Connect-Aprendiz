import { Routes, Route, useLocation } from 'react-router-dom'; // Adicionei o useLocation aqui
import Sidebar from './components/Sidebar/Sidebar.jsx';
<<<<<<< HEAD
import './App.css';

// --- IMPORTS DO APRENDIZ ---
import Login from './pages/aprendiz/Login.jsx'
import Dashboard from './pages/aprendiz/Dashboard.jsx';
import Mural from './pages/aprendiz/Mural.jsx';
import Carreiras from './pages/aprendiz/Carreiras.jsx';
import Justificativas from './pages/aprendiz/Justificativas.jsx';
import Boletim from './pages/aprendiz/Boletim.jsx';

// --- IMPORTS DO GESTOR ---
import Desempenho from './pages/gestor/Desempenho.jsx'; 
import Contracheque from './pages/gestor/Contracheque.jsx';
import GerirTurmas from './pages/pedagogo/GerirTurmas.jsx';
import PublicarMaterial from './pages/pedagogo/PublicarMaterial.jsx';
=======
import Dashboard from './pages/aprendiz/Dashboard.jsx';
// Importe as outras páginas que vamos criar (mesmo que vazias agora)
// import Boletim from './pages/Boletim'; 
import './App.css';

import Mural from './pages/aprendiz/Mural.jsx';
import Carreiras from './pages/aprendiz/Carreiras.jsx';
import Justificativas from './pages/aprendiz/Justificativas.jsx'
import Boletim from './pages/aprendiz/Boletim.jsx'

import JustificativasGestor from './pages/gestor/Justificativas.jsx'
import JustificativasPedagogo from './pages/pedagogo/Justificativas.jsx'
import Login from './pages/aprendiz/Login.jsx'
>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7

function App() {
  const location = useLocation(); // Hook para saber em qual URL estamos

  // Verificamos se a rota atual é a do login ("/")
  const isLoginPage = location.pathname === "/";

  return (
    <div className="app-layout">
      {/* Se NÃO for a página de login, mostra a Sidebar */}
      {!isLoginPage && <Sidebar />}

      <main className="content">
        <Routes>
          {/* Rotas do Aprendiz */}
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/boletim" element={<Boletim />} />
          <Route path="/justificativas" element={<Justificativas />} />
          
          <Route path="/mural" element={
            <div style={{ color: "black" }}>
              <Mural />
            </div>
          } />

          <Route path="/carreiras" element={
            <div style={{ color: "black" }}>
              <Carreiras />
            </div>
          } />

<<<<<<< HEAD
          {/* --- NOVAS ROTAS DO GESTOR --- */}
          <Route path="/gestor/desempenho" element={<Desempenho />} />
          <Route path="/gestor/contracheque" element={<Contracheque />} />
          <Route path="/pedagogo/gerirturmas" element={<GerirTurmas />} />
          <Route path="/pedagogo/publicarmaterial" element={<PublicarMaterial />} />
=======
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

>>>>>>> 11a60779e0432f45af36e6f2129d7bda39dd33e7
        </Routes>
      </main>
    </div>
  );
}

export default App;