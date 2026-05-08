import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./PublicarMaterial.css";
// ✅ Importação dos ícones necessários para o modal e botões
import { 
  FaComments, 
  FaEnvelope, 
  FaTimes, 
  FaUserTie, 
  FaUsers, 
  FaCloudUploadAlt,
  FaBell, 
  FaUserCircle, 
  FaFileDownload 
} from "react-icons/fa";

export default function PublicarMaterial() {
    const [turmas, setTurmas] = useState([]);
    const [materiais, setMateriais] = useState([]);
    const [material, setMaterial] = useState({ titulo: "", descricao: "", link_material: "", turma_id: "" });
    const [arquivo, setArquivo] = useState(null);
    
    // ✅ Estados para o Modal de Contatos
    const [aprendizes, setAprendizes] = useState([]);
    const [showContactModal, setShowContactModal] = useState(false);

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || { nome: 'Aprendiz', nivel: 'aprendiz' };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
 
 const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };
 

    // ✅ Informação fixa do Gestor (Sérgio Carvalho)
    const contatoGestor = { 
        nome: "Sérgio Carvalho", 
        email: "sergio.carvalho@petrobras.com.br", 
        tel: "(21) 99999-7777" 
    };

    // Carrega turmas, materiais e lista de contatos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resTurmas = await axios.get("http://localhost:5000/api/turmas");
                setTurmas(resTurmas.data);
                
                const resMateriais = await axios.get("http://localhost:5000/api/materiais");
                setMateriais(resMateriais.data);

                // ✅ Busca a lista de aprendizes para o modal de contatos
                const resContatos = await axios.get("http://localhost:5000/api/turmas/dados/lancamento");
                setAprendizes(resContatos.data.alunos || []);
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
            
            setMaterial({ titulo: "", descricao: "", link_material: "", turma_id: "" });
            setArquivo(null);
            
            const res = await axios.get("http://localhost:5000/api/materiais");
            setMateriais(res.data);
            
        } catch (err) {
            console.error(err);
            alert("Erro ao publicar.");
        }
    };

    return (
        <div className="gerir-turmas-container">
            {/* ✅ Título com o emoji padronizado */}

            <header className="header-principal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 className="titulo-pagina" style={{ margin: 0 }}>Publicar Material</h2>

            <div className="perfil-header" style={{ position: 'relative' }}>
                <div className="icon-wrapper" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ cursor: 'pointer' }}>
                    <FaUserCircle size={40} />
                    
                    {isMenuOpen && (
                        <div className="dropdown-popup">
                            <div className="user-info-header">
                                <strong>{usuarioLogado.nome}</strong>
                                <span>{usuarioLogado.nivel === 'pedagogia' ? 'Pedagogia' : usuarioLogado.nivel} - Petrobras</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                <li className="logout-opt" onClick={handleLogout}>Sair do Sistema</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
            
            <div className="layout-grid">
                {/* PAINEL ESQUERDO: FORMULÁRIO */}
                <div className="card-turma" style={{ flex: 2 }}>
                    <h3 className="titulo-secao"><FaCloudUploadAlt /> Novo Conteúdo</h3>
                    
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

            {/* ✅ BOTÃO FLUTUANTE DE CONTATOS */}
            <div className="floating-contact" onClick={() => setShowContactModal(true)}>
                <FaComments />
                <span>Contatos</span>
            </div>

            {/* ✅ MODAL DE CONTATOS UNIFICADO */}
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
                                    <span className="action-link phone">{contatoGestor.tel}</span>
                                </div>
                            </div>

                            <hr style={{ margin: '15px 0', opacity: '0.1' }} />

                            {/* SEÇÃO: APRENDIZES */}
                            <div style={{ padding: '10px 5px', fontWeight: 'bold', color: '#1a3a5a', fontSize: '0.9rem' }}>
                                APRENDIZES CADASTRADOS
                            </div>
                            {aprendizes.length > 0 ? (
                                aprendizes.map((aluno) => (
                                    <div key={aluno.id} className="contact-card">
                                        <strong>{aluno.nome}</strong> <span> | Aprendiz</span>
                                        <div className="contact-actions">
                                            <a href={`mailto:${aluno.email}`} className="action-link mail">
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