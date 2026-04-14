import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import './App.css';

import Mural from './pages/Mural.jsx';
import Carreiras from './pages/Carreiras.jsx';
import Boletim from './pages/Boletim.jsx';

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route
  path="/boletim"
  element={
    <div style={{ color: "black" }}>
      <Boletim />
    </div>
  }
/>

          <Route
            path="/justificativas"
            element={<h1 style={{ color: "black" }}>Página de Justificativas</h1>}
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

        </Routes>
      </main>
    </div>
  );
}

export default App;