import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
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

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />

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