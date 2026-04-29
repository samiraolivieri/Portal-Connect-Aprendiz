import React, { useEffect, useState } from 'react';
import './Desempenho.css';
 
const Desempenho = () => {
    const [aprendizes, setAprendizes] = useState([]);
    // Criamos estados para os cálculos do topo
    const [mediaTurma, setMediaTurma] = useState(0);
    const [aproveitamento, setAproveitamento] = useState(0);
 
    useEffect(() => {
        const fetchDesempenho = async () => {
            try {
                // Ajuste a URL para a rota exata do seu back-end
                const response = await fetch('http://localhost:5000/api/desempenho/geral');
                const data = await response.json();
               
                setAprendizes(data);
 
                // --- LÓGICA DE CÁLCULO DOS CARDS ---
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
 
    return (
        <div className="desempenho-page">
            <header className="desempenho-header">
                <h1>Olá, Gestor!</h1>
                <p>Acompanhe aqui o rendimento acadêmico e técnico da sua turma.</p>
            </header>
 
            <section className="resumo-cards">
                <div className="card-info">
                    <span>Média da Turma</span>
                    {/* Agora o valor é real! */}
                    <h2>{mediaTurma}</h2>
                </div>
                <div className="card-info">
                    <span>Aproveitamento</span>
                    {/* Agora o valor é real! */}
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
                                        <button className="btn-ver">Relatório</button>
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
        </div>
    );
};
 
export default Desempenho;