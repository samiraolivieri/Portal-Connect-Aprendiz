import { useState, useEffect } from "react";
import axios from "axios";
import "./GerirTurmas.css";

export default function GerirTurmas() {
    const [turmas, setTurmas] = useState([]);
    const [novaTurma, setNovaTurma] = useState({ nome: "", curso: "", periodo: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detalhesTurma, setDetalhesTurma] = useState(null);

    // Estados para Lançamento de Notas
    const [listaAlunos, setListaAlunos] = useState([]);
    const [listaUcs, setListaUcs] = useState([]);
    const [novaNota, setNovaNota] = useState({ aluno_id: "", uc_id: "", valor_nota: "" });

    // Estados para Lançamento de Frequência - CORRIGIDO
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
            setListaAlunos(res.data.alunos);
            setListaUcs(res.data.ucs);
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
        // Validação usando data_aula
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

            {/* Lançamento de Frequência - CORRIGIDO */}
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
                    {/* Campo corrigido para usar data_aula */}
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

           {/* MODAL */}
{isModalOpen && detalhesTurma && (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>{detalhesTurma.nome}</h2>
            <p><strong>Curso:</strong> {detalhesTurma.curso}</p>
            <p><strong>ID da Turma:</strong> {detalhesTurma.id}</p>
            <p><strong>Instrutor:</strong> {detalhesTurma.instrutor || "Não informado"}</p>
            <p><strong>Total de Alunos:</strong> {detalhesTurma.alunos.length}</p>
            
            <ul style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {detalhesTurma.alunos.map(aluno => (
                    <li key={aluno.id}>{aluno.nome}</li>
                ))}
            </ul>
            
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
}