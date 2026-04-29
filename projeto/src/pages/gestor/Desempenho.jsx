import React, { useEffect, useState } from 'react';
import './Desempenho.css';

const Desempenho = () => {
    const [aprendizes, setAprendizes] = useState([]);
    const [mediaTurma, setMediaTurma] = useState(0);
    const [aproveitamento, setAproveitamento] = useState(0);

    // Estados para o Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alunoRelatorio, setAlunoRelatorio] = useState(null);

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

    // Função que busca os detalhes e abre o modal
    const handleVisualizarRelatorio = async (id) => {
        try {
            // Agora esta rota retorna { nome: "...", notas: [...], frequencias: [...] }
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
                <h1>Olá, Gestor!</h1>
                <p>Acompanhe aqui o rendimento acadêmico e técnico da sua turma.</p>
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
                        
                        {/* SEÇÃO DE NOTAS */}
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

                        {/* SEÇÃO DE FREQUÊNCIA (NOVA) */}
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
                        
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            className="btn-adicionar" 
                            style={{ marginTop: '20px', width: '100%' }}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Desempenho;