import React, { useState, useEffect } from 'react';
import './DashboardGestor.css';
import axios from 'axios';
// import { agendarVisita } from '../;
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaThLarge, FaFileAlt, FaBullhorn, FaBriefcase, FaBell, FaUserCircle, FaComments } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import ContatoPopup from '../../components/ContatoPopup';


const data = [
  { mes: 'Jan', performance: 65 },
  { mes: 'Fev', performance: 70 },
  { mes: 'Mar', performance: 80 },
  { mes: 'Abr', performance: 85 },
];

const DashboardGestor = () => {

  const [dataVisita, setDataVisita] = useState(new Date());
  const [minhasVisitas, setMinhasVisitas] = useState([]);


  const [showContactModal, setShowContactModal] = useState(false);
  const [contatoSelecionado, setContatoSelecionado] = useState(null);


  const carregarVisitas = async () => {
    try {
      const gestorId = 1; // ID que existe no seu banco
      const response = await axios.get(`http://localhost:5000/api/visitas/listar/${gestorId}`);
      setMinhasVisitas(response.data);
    } catch (error) {
      console.error("Erro ao carregar visitas:", error);
    }
  };



  useEffect(() => {
    carregarVisitas();
  }, []);

  const handleAgendar = async () => {
    try {
      // Formata a data selecionada no react-calendar para o MySQL (YYYY-MM-DD)
      const ano = dataVisita.getFullYear();
      const mes = String(dataVisita.getMonth() + 1).padStart(2, '0');
      const dia = String(dataVisita.getDate()).padStart(2, '0');
      const dataFormatada = `${ano}-${mes}-${dia}`;
      // Supondo que o ID do gestor logado seja 1
      // (Ajuste a porta 5000 se o seu backend usar outra)
      await axios.post('http://localhost:5000/api/visitas/agendar', {
        gestor_id: 1,
        data_visita: dataFormatada
      });

      alert('Visita agendada com sucesso!');
      carregarVisitas();
    } catch (error) {
      console.error(error);
      alert('Erro ao agendar. Verifique se o servidor está rodando.');
    }
  };

  const [dadosGrafico, setDadosGrafico] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/visitas/desempenho-turma');
        setDadosGrafico(response.data);
      } catch (error) {
        console.error("Erro na requisição do gráfico:", error);
      }
    };
    buscarDados();
  }, []);


  return (
    <div className="dashboard-container">

      <header className="dash-header">
        <h1> <FaThLarge /> GESTÃO DE APRENDIZES</h1>
        <div className="header-icons">
          <FaBell />
          <FaUserCircle />
        </div>
      </header>
      {/* Box de Alerta Prioritário */}


      <section className="visitas-agendadas-section">
        <h3>VISITAS TÉCNICAS AGENDADAS</h3>
        <div className="visitas-lista">
          {minhasVisitas.length === 0 ? (
            <p>Nenhuma visita agendada para este gestor.</p>
          ) : (
            <table className="pendencias-table">
              <thead>
                <tr>
                  <th>Data da Visita</th>
                  <th>Status</th>
                  <th>Criado em</th>
                </tr>
              </thead>
              <tbody>
                {minhasVisitas.map((visita) => (
                  <tr key={visita.id}>
                    {/* Formata a data para o padrão brasileiro ao exibir */}
                    <td>{new Date(visita.data_visita).toLocaleDateString('pt-BR')}</td>
                    <td><span className={`status-badge-${(visita.status).toLowerCase()}`} >{visita.status}</span></td>
                    <td>{new Date(visita.data_criacao).toLocaleString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
      {/* Grid Principal */}
      <div className="gestor-grid">
        <div className="monitoramento-card">
          <h3>MONITORAMENTO DE APRENDIZAGEM</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" />
                <YAxis domain={[0, 10]} /> {/* Ajustado para escala de notas 0-10 */}
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#2980b9"
                  strokeWidth={3}
                  name="Média da Turma"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="acoes-rapidas">
          <h3>AGENDAR VISITA TÉCNICA</h3>
          <div className="calendario-wrapper">
            <Calendar
              onChange={setDataVisita}
              value={dataVisita}
              locale="pt-BR" // Para mostrar em Português
            />
          </div>

          <button className="btn-confirmar" onClick={handleAgendar}> CONFIRMAR</button>
        </div>

        <div className="floating-contact" onClick={() => setShowContactModal(true)}>
          <FaComments />
          <span>Contatos</span>
        </div>
      </div>

      {contatoSelecionado && (
        <ContatoPopup
          contato={contatoSelecionado}
          onClose={() => setContatoSelecionado(null)}
        />
        
      )}



    </div>




  );


};



export default DashboardGestor;