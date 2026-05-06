import { useState, useEffect } from "react";
import axios from "axios";
import "./PublicarMaterial.css";

export default function PublicarMaterial() {
    const [turmas, setTurmas] = useState([]);
    const [materiais, setMateriais] = useState([]); // Novo estado para a lista
    const [material, setMaterial] = useState({ titulo: "", descricao: "", link_material: "", turma_id: "" });
    const [arquivo, setArquivo] = useState(null);

    // Carrega turmas e materiais iniciais
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resTurmas = await axios.get("http://localhost:5000/api/turmas");
                setTurmas(resTurmas.data);
                
                const resMateriais = await axios.get("http://localhost:5000/api/materiais");
                setMateriais(resMateriais.data);
            } catch (err) {
                console.error("Erro ao carregar dados", err);
            }
        };
        fetchData();
    }, []);

    const handlePublicar = async () => {
        if (!material.titulo || !material.turma_id) {
            return alert("Por favor, preencha o Título e selecione a Turma.");
        }

        const formData = new FormData();
        formData.append('titulo', material.titulo);
        formData.append('descricao', material.descricao);
        formData.append('link_material', material.link_material);
        formData.append('turma_id', material.turma_id);
        
        if (arquivo) {
            formData.append('arquivo', arquivo);
        }

        try {
            await axios.post("http://localhost:5000/api/materiais/publicar", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Material publicado com sucesso!");
            
            // Limpa o formulário
            setMaterial({ titulo: "", descricao: "", link_material: "", turma_id: "" });
            setArquivo(null);
            
            // Atualiza a lista na hora, sem precisar recarregar a página
            const res = await axios.get("http://localhost:5000/api/materiais");
            setMateriais(res.data);
            
        } catch (err) {
            console.error(err);
            alert("Erro ao publicar.");
        }
    };

    return (
        <div className="gerir-turmas-container">
            <h2 className="titulo-pagina">Publicar Material</h2>
            
            {/* O Grid que divide a tela em duas colunas */}
            <div className="layout-grid">
                
                {/* PAINEL ESQUERDO: FORMULÁRIO */}
                <div className="card-turma" style={{ flex: 2 }}>
                    <h3 className="titulo-secao">Novo Conteúdo</h3>
                    
                    <div className="form-turma">
                        <div className="input-group">
                            <input className="input-field" placeholder="Título" value={material.titulo} onChange={(e) => setMaterial({...material, titulo: e.target.value})} />
                        </div>

                        <div className="input-group">
                            <select className="input-field" value={material.turma_id} onChange={(e) => setMaterial({...material, turma_id: e.target.value})}>
                                <option value="">Selecione a Turma</option>
                                {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                            </select>
                        </div>

                        <div className="input-group">
                            <input className="input-field" placeholder="Link (Opcional)" value={material.link_material} onChange={(e) => setMaterial({...material, link_material: e.target.value})} />
                        </div>

                        <div className="input-group">
                            <label className="input-label" style={{ marginBottom: '5px', display: 'block' }}>PDF do Material:</label>
                            <label htmlFor="file-upload" className="file-upload-box">
                                <span className="upload-text">{arquivo ? arquivo.name : "Clique aqui para selecionar o PDF"}</span>
                                <input id="file-upload" type="file" className="hidden-file-input" accept=".pdf" onChange={(e) => setArquivo(e.target.files[0])} />
                            </label>
                        </div>

                        <div className="input-group" style={{ flex: '2' }}>
                            <input className="input-field" placeholder="Descrição" value={material.descricao} onChange={(e) => setMaterial({...material, descricao: e.target.value})} />
                        </div>

                        <button onClick={handlePublicar} className="btn-adicionar">Publicar</button>
                    </div>
                </div>

                {/* PAINEL DIREITO: LISTA DE ENVIOS */}
                <div className="card-turma" style={{ flex: 1 }}>
                    <h3 className="titulo-secao">Últimos Envios</h3>
                    <div className="lista-materiais">
                        {materiais.length === 0 ? <p style={{ fontSize: '0.9rem', color: '#888' }}>Nenhum material publicado ainda.</p> :
                         materiais.map(m => (
                            <div key={m.id} className="item-lista">
                                <strong>{m.titulo}</strong>
                                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px' }}>
                                    Turma ID: {m.turma_id}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}