import { useState, useEffect } from "react";
import axios from "axios";
import "./GerirTurmas.css";
// ✅ Importação dos ícones necessários
import { FaComments, FaEnvelope, FaTimes, FaUserTie, FaUsers } from "react-icons/fa";

export default function GerirTurmas() {
    const [turmas, setTurmas] = useState([]);
    const [novaTurma, setNovaTurma] = useState({ nome: "", curso: "", periodo: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detalhesTurma, setDetalhesTurma] = useState(null);

    // Estados para Lançamento de Notas e Contatos
    const [listaAlunos, setListaAlunos] = useState([]);
    const [listaUcs, setListaUcs] = useState([]);
    const [showContactModal, setShowContactModal] = useState(false);

    // ✅ CORRIGIDO: Removida a redeclaração. Agora é apenas o objeto fixo como no Contracheque.
    const contatoGestor = { 
        nome: "Sérgio Carvalho", 
        email: "sergio.carvalho@petrobras.com.br", 
        telefone: "(21) 99999-7777" 
    };

    const [novaNota, setNovaNota] = useState({ aluno_id: "", uc_id: "", valor_nota: "" });
    const [novaFrequencia, setNovaFrequencia] = useState({ 
        aluno_id: "", 
        uc_id: "", 
        data_aula: "", 
        valor_frequencia: "" 
    });

    useEffect(() => {
        fetchTurmas();
        fetchDadosLancamento();
    }, []);

    const fetchTurmas = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/turmas");
            setTurmas(response.data);
        } catch (error) {
            console.error("Erro ao buscar turmas:", error);
        }
    };

    const fetchDadosLancamento = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/turmas/dados/lancamento");
            setListaAlunos(res.data.alunos || []);
            setListaUcs(res.data.ucs || []);
        } catch (error) {
            console.error("Erro ao carregar dados de lançamento:", error);
        }
    };

    const handleCreate = async () => {
        if (!novaTurma.nome || !novaTurma.curso || !novaTurma.periodo) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/turmas", novaTurma);
            setNovaTurma({ nome: "", curso: "", periodo: "" });
            fetchTurmas();
        } catch (error) {
            alert("Erro ao criar turma.");
        }
    };

    const handleLancarNota = async () => {
        if (!novaNota.aluno_id || !novaNota.uc_id || !novaNota.valor_nota) {
            alert("Preencha todos os campos da nota.");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/turmas/notas", novaNota);
            alert("Nota lançada com sucesso!");
            setNovaNota({ aluno_id: "", uc_id: "", valor_nota: "" });
        } catch (error) {
            alert("Erro ao lançar nota.");
        }
    };

    const handleLancarFrequencia = async () => {
        if (!novaFrequencia.aluno_id || !novaFrequencia.uc_id || !novaFrequencia.data_aula || !novaFrequencia.valor_frequencia) {
            alert("Preencha todos os campos da frequência.");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/turmas/frequencia", novaFrequencia);
            alert("Frequência lançada com sucesso!");
            setNovaFrequencia({ aluno_id: "", uc_id: "", data_aula: "", valor_frequencia: "" });
        } catch (error) {
            alert("Erro ao lançar frequência.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Deseja realmente excluir esta turma?")) {
            try {
                await axios.delete(`http://localhost:5000/api/turmas/${id}`);
                fetchTurmas();
            } catch (error) {
                alert("Erro ao excluir turma.");
            }
        }
    };

    const handleVisualizar = async (turma) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/turmas/${turma.id}/detalhes`);
            setDetalhesTurma({ ...turma, alunos: response.data.alunos });
            setIsModalOpen(true);
        } catch (error) {
            alert("Erro ao carregar detalhes");
        }
    };

    return (
        <div className="gerir-turmas-container">
            <h2 className="titulo-pagina">Gerenciamento de Turmas</h2>

            {/* Cadastro de Turma */}
            <div className="card-turma">
                <h3 className="titulo-secao">Cadastrar Nova Turma</h3>
                <div className="form-turma">
                    <div className="input-group"><input className="input-field" placeholder="Nome" value={novaTurma.nome} onChange={(e) => setNovaTurma({...novaTurma, nome: e.target.value})} /></div>
                    <div className="input-group"><input className="input-field" placeholder="Curso" value={novaTurma.curso} onChange={(e) => setNovaTurma({...novaTurma, curso: e.target.value})} /></div>
                    <div className="input-group"><input className="input-field" placeholder="Período" value={novaTurma.periodo} onChange={(e) => setNovaTurma({...novaTurma, periodo: e.target.value})} /></div>
                    <button onClick={handleCreate} className="btn-adicionar">Adicionar</button>
                </div>
            </div>

            {/* Lançamento de Notas */}
            <div className="card-turma">
                <h3 className="titulo-secao">Lançamento de Notas</h3>
                <div className="form-turma">
                    <div className="input-group">
                        <select className="input-field" value={novaNota.aluno_id} onChange={(e) => setNovaNota({...novaNota, aluno_id: e.target.value})}>
                            <option value="">Aluno</option>
                            {listaAlunos.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
                        </select>
                    </div>
                    <div className="input-group">
                        <select className="input-field" value={novaNota.uc_id} onChange={(e) => setNovaNota({...novaNota, uc_id: e.target.value})}>
                            <option value="">UC</option>
                            {listaUcs.map(u => <option key={u.id} value={u.id}>{u.nome_uc}</option>)}
                        </select>
                    </div>
                    <div className="input-group"><input type="number" className="input-field" placeholder="Nota" value={novaNota.valor_nota} onChange={(e) => setNovaNota({...novaNota, valor_nota: e.target.value})} /></div>
                    <button onClick={handleLancarNota} className="btn-adicionar">Salvar Nota</button>
                </div>
            </div>

            {/* Lançamento de Frequência */}
            <div className="card-turma">
                <h3 className="titulo-secao">Lançamento de Frequência</h3>
                <div className="form-turma">
                    <div className="input-group">
                        <select className="input-field" value={novaFrequencia.aluno_id} onChange={(e) => setNovaFrequencia({...novaFrequencia, aluno_id: e.target.value})}>
                            <option value="">Aluno</option>
                            {listaAlunos.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
                        </select>
                    </div>
                    <div className="input-group">
                        <select className="input-field" value={novaFrequencia.uc_id} onChange={(e) => setNovaFrequencia({...novaFrequencia, uc_id: e.target.value})}>
                            <option value="">UC</option>
                            {listaUcs.map(u => <option key={u.id} value={u.id}>{u.nome_uc}</option>)}
                        </select>
                    </div>
                    <div className="input-group">
                        <input type="date" className="input-field" value={novaFrequencia.data_aula} onChange={(e) => setNovaFrequencia({...novaFrequencia, data_aula: e.target.value})} />
                    </div>
                    <div className="input-group"><input type="number" className="input-field" placeholder="Freq (%)" value={novaFrequencia.valor_frequencia} onChange={(e) => setNovaFrequencia({...novaFrequencia, valor_frequencia: e.target.value})} /></div>
                    <button onClick={handleLancarFrequencia} className="btn-adicionar">Salvar Freq.</button>
                </div>
            </div>

            {/* Lista de Turmas */}
            <div className="card-turma">
                <h3 className="titulo-secao">Turmas Cadastradas</h3>
                <table>
                    <thead>
                        <tr><th>Nome</th><th>Curso</th><th>Período</th><th>Ações</th></tr>
                    </thead>
                    <tbody>
                        {turmas.map((turma) => (
                            <tr key={turma.id}>
                                <td>{turma.nome}</td><td>{turma.curso}</td><td>{turma.periodo}</td>
                                <td>
                                    <button className="btn-visualizar" onClick={() => handleVisualizar(turma)}>Visualizar</button>
                                    <button className="btn-del" onClick={() => handleDelete(turma.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL DE DETALHES DA TURMA */}
            {isModalOpen && detalhesTurma && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{detalhesTurma.nome}</h2>
                        <p><strong>Curso:</strong> {detalhesTurma.curso}</p>
                        <p><strong>Total de Alunos:</strong> {detalhesTurma.alunos.length}</p>
                        <ul style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {detalhesTurma.alunos.map(aluno => (
                                <li key={aluno.id}>{aluno.nome}</li>
                            ))}
                        </ul>
                        <button onClick={() => setIsModalOpen(false)} className="btn-adicionar" style={{ marginTop: '20px', width: '100%' }}>Fechar</button>
                    </div>
                </div>
            )}

            {/* BOTÃO FLUTUANTE DE CONTATOS */}
            <div className="floating-contact" onClick={() => setShowContactModal(true)}>
                <FaComments />
                <span>Contatos</span>
            </div>

            {/* MODAL DE CONTATOS */}
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
                            {/* SEÇÃO: GESTÃO */}
                            <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>
                                GESTÃO
                            </div>
                            <div className="contact-card" style={{ borderLeft: '4px solid #1a3a5a' }}>
                                <strong>{contatoGestor.nome}</strong>
                                <div className="contact-actions">
                                    <a href={`mailto:${contatoGestor.email}`} className="action-link mail">
                                        <FaEnvelope /> Email
                                    </a>
                                    {contatoGestor.telefone && <span className="action-link phone">{contatoGestor.telefone}</span>}
                                </div>
                            </div>

                            <hr style={{ margin: '15px 0', opacity: '0.1' }} />

                            {/* SEÇÃO: APRENDIZES */}
                            <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>
                                APRENDIZES CADASTRADOS
                            </div>
                            {listaAlunos.length > 0 ? (
                                listaAlunos.map((aluno) => (
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
                                <p style={{ padding: '10px', fontSize: '0.8rem' }}>Nenhum aprendiz encontrado.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}