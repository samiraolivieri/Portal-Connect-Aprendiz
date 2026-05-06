import React, { useEffect, useState } from 'react';
import './Desempenho.css';
import { 
  FaBriefcase, 
  FaComments, 
  FaTimes, 
  FaEnvelope 
} from 'react-icons/fa';

const Desempenho = () => {
    const [aprendizes, setAprendizes] = useState([]);
    const [mediaTurma, setMediaTurma] = useState(0);
    const [aproveitamento, setAproveitamento] = useState(0);

    // Estados para o Modal de Relatório
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alunoRelatorio, setAlunoRelatorio] = useState(null);

    // Estado para o Popup de Contatos
    const [showContactModal, setShowContactModal] = useState(false);

    // Informação fixa da Pedagoga
    const contatoPedagoga = { 
        nome: "Vilma Nascimento", 
        cargo: "Pedagogia", 
        email: "amaior@ensino.com", 
        tel: "(21) 88888-8888" 
    };

    useEffect(() => {
        const fetchDesempenho = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/desempenho/geral');
                const data = await response.json();
                
                setAprendizes(data);

                if (data.length > 0) {
                    const somaNotas = data.reduce((acc, curr) => acc + parseFloat(curr.media_academica), 0);
                    const somaFreq = data.reduce((acc, curr) => acc + parseFloat(curr.media_frequencia), 0);
                    
                    setMediaTurma((somaNotas / data.length).toFixed(1));
                    setAproveitamento((somaFreq / data.length).toFixed(0));
                }
            } catch (error) {
                console.error("Erro ao carregar desempenho:", error);
            }
        };

        fetchDesempenho();
    }, []);

    const handleVisualizarRelatorio = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/desempenho/${id}`);
            const data = await response.json();
            setAlunoRelatorio(data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Erro ao buscar relatório:", error);
            alert("Erro ao carregar detalhes do aluno.");
        }
    };

    return (
        <div className="desempenho-page">
            <header className="desempenho-header">
                <h1> <FaBriefcase /> Desempenho dos Aprendizes</h1>
            </header>

            <section className="resumo-cards">
                <div className="card-info">
                    <span>Média da Turma</span>
                    <h2>{mediaTurma}</h2>
                </div>
                <div className="card-info">
                    <span>Aproveitamento</span>
                    <h2>{aproveitamento}%</h2>
                </div>
                <div className="card-info">
                    <span>Total de Aprendizes</span>
                    <h2>{aprendizes.length}</h2>
                </div>
            </section>

            <section className="tabela-container">
                <h3>Detalhamento por Aprendiz</h3>
                <table className="tabela-desempenho">
                    <thead>
                        <tr>
                            <th>Nome do Aprendiz</th>
                            <th>Frequência (%)</th>
                            <th>Média Final</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aprendizes.length > 0 ? (
                            aprendizes.map((aprendiz) => (
                                <tr key={aprendiz.id}>
                                    <td className="col-nome">
                                        <div className="avatar">{aprendiz.nome.charAt(0)}</div>
                                        {aprendiz.nome}
                                    </td>
                                    <td>{parseFloat(aprendiz.media_frequencia).toFixed(0)}%</td>
                                    <td>{parseFloat(aprendiz.media_academica).toFixed(1)}</td>
                                    <td>
                                        <span className={`status-label ${aprendiz.media_academica >= 7 ? 'bom' : 'alerta'}`}>
                                            {aprendiz.media_academica >= 7 ? 'Excelente' : 'Atenção'}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn-ver" onClick={() => handleVisualizarRelatorio(aprendiz.id)}>Relatório</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="loading">Carregando dados dos aprendizes...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* MODAL DE RELATÓRIO COMPLETO */}
            {isModalOpen && alunoRelatorio && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Relatório: {alunoRelatorio.nome}</h2>
                        <div style={{ marginTop: '20px' }}>
                            <p><strong>Notas por UC:</strong></p>
                            <ul style={{ maxHeight: '150px', overflowY: 'auto', paddingLeft: '20px', marginBottom: '15px' }}>
                                {alunoRelatorio.notas && alunoRelatorio.notas.length > 0 ? (
                                    alunoRelatorio.notas.map((item, index) => (
                                        <li key={index} style={{ marginBottom: '5px' }}>
                                            {item.nome_uc}: <strong>{item.valor_nota}</strong>
                                        </li>
                                    ))
                                ) : (
                                    <p style={{fontSize: '0.8rem'}}>Nenhuma nota registrada.</p>
                                )}
                            </ul>
                        </div>
                        <div style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                            <p><strong>Frequência por UC:</strong></p>
                            <ul style={{ maxHeight: '150px', overflowY: 'auto', paddingLeft: '20px' }}>
                                {alunoRelatorio.frequencias && alunoRelatorio.frequencias.length > 0 ? (
                                    alunoRelatorio.frequencias.map((item, index) => (
                                        <li key={index} style={{ marginBottom: '5px' }}>
                                            {item.nome_uc} ({new Date(item.data_aula).toLocaleDateString('pt-BR')}): 
                                            <strong> {item.valor_frequencia}%</strong>
                                        </li>
                                    ))
                                ) : (
                                    <p style={{fontSize: '0.8rem'}}>Nenhuma frequência registrada.</p>
                                )}
                            </ul>
                        </div>
                        <button onClick={() => setIsModalOpen(false)} className="btn-adicionar" style={{ marginTop: '20px', width: '100%' }}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            {/* BOTÃO FLUTUANTE DE CONTATOS */}
            <div className="floating-contact" onClick={() => setShowContactModal(true)}>
                <FaComments />
                <span>Contatos</span>
            </div>

            {/* MODAL DE SUPORTE E LISTA DE ALUNOS */}
            {showContactModal && (
                <div className="contact-overlay active" onClick={() => setShowContactModal(false)}>
                    <div className="contact-window" onClick={(e) => e.stopPropagation()}>
                        <div className="contact-header">
                            <h4>Lista de Contatos</h4>
                            <button className="btn-close-contact" onClick={() => setShowContactModal(false)}>
                                <FaTimes />
                            </button>
                        </div>
                        
                        <div className="contact-list" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                            
                           {/* SEÇÃO: PEDAGOGIA */}
                                         <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>
                                           PEDAGOGIA
                                         </div>
                                         <div className="contact-card" style={{ borderLeft: '4px solid #2e7d32' }}>
                                           <strong>{contatoPedagoga.nome}</strong> <span> | {contatoPedagoga.cargo}</span>
                                           <div className="contact-actions">
                                             <a href={`mailto:${contatoPedagoga.email}`} className="action-link mail">
                                               <FaEnvelope /> Email
                                             </a>
                                             <a href={`tel:${contatoPedagoga.tel}`} className="action-link phone">{contatoPedagoga.tel}</a>
                                           </div>
                                         </div>
                           
                                         <hr style={{ margin: '15px 0', opacity: '0.1' }} />
                            {/* SEÇÃO: APRENDIZES (DO BANCO) */}
                            <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>
                                APRENDIZES
                            </div>
                            {aprendizes.length > 0 ? (
                                aprendizes.map((aluno) => (
                                    <div key={aluno.id} className="contact-card">
                                        <strong>{aluno.nome}</strong> <span> | Aprendiz</span>
                                        <div className="contact-actions">
                                            <a href={`mailto:${aluno.email}`} className="action-link mail" title={aluno.email}>
                                                <FaEnvelope /> Email
                                            </a>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ padding: '10px', fontSize: '0.8rem' }}>Carregando aprendizes...</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Desempenho;