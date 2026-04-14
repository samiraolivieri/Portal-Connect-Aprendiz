import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Boletim from './pages/Boletim.jsx'; // Certifique-se que o caminho está correto
// Importe as outras páginas que vamos criar (mesmo que vazias agora)
// import Boletim from './pages/Boletim'; 
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/boletim" element={<Boletim />} />
          <Route path="/justificativas" element={<h1 style={{color: 'black'}}>Página de Justificativas</h1>} />
          <Route path="/mural" element={<h1 style={{color: 'black'}}>Mural de Avisos</h1>} />
          <Route path="/carreiras" element={<h1 style={{color: 'black'}}>Portal Carreiras</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;