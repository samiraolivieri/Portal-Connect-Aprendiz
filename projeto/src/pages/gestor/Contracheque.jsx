import React, { useState, useEffect } from 'react';
import { FaCloudUploadAlt, FaFilePdf, FaHistory } from 'react-icons/fa';
import './Contracheque.css';

const Contracheque = () => {
  const [aprendizes, setAprendizes] = useState([]); // Lista que virá do banco
  const [selectedFile, setSelectedFile] = useState(null);
  const [aprendizId, setAprendizId] = useState('');
  const [mesReferencia, setMesReferencia] = useState('');
  const [ultimosEnvios, setUltimosEnvios] = useState([]); // Histórico real

  // 1. Busca os aprendizes cadastrados para preencher o Select
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/aprendizes') // Verifique se sua rota de usuários é essa
      .then(res => res.json())
      .then(data => setAprendizes(data))
      .catch(err => console.error("Erro ao carregar aprendizes:", err));

    // 2. Busca o histórico de envios (lado direito)
    fetch('http://localhost:5000/api/contracheque/todos')
      .then(res => res.json())
      .then(data => setUltimosEnvios(data))
      .catch(err => console.error("Erro ao carregar histórico:", err));
  }, []);

  // 3. Função para enviar o formulário
 // Função para buscar os envios (vamos isolar ela para usar em dois lugares)
 const carregarEnvios = () => {
  fetch('http://localhost:5000/api/contracheque/todos')
    .then(res => res.json())
    .then(data => setUltimosEnvios(data))
    .catch(err => console.error("Erro ao carregar histórico:", err));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedFile || !aprendizId || !mesReferencia) {
    alert("Por favor, preencha todos os campos e selecione um arquivo.");
    return;
  }

  const formData = new FormData();
  formData.append('aprendiz_id', aprendizId);
  formData.append('mes_referencia', mesReferencia);
  formData.append('arquivo', selectedFile);

  try {
    const response = await fetch('http://localhost:5000/api/contracheque/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert("Contracheque liberado com sucesso!");
      setSelectedFile(null);
      setAprendizId('');
      setMesReferencia('');
      
      // --- O PULO DO GATO ---
      carregarEnvios(); // Chama a função para atualizar a lista na hora!
    } else {
      alert("Erro ao enviar contracheque.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};

  return (
    <div className="contracheque-container">
      <h1 className="titulo-pagina">GERENCIAMENTO DE CONTRACHEQUES</h1>

      <div className="layout-grid">
        {/* COLUNA ESQUERDA: FORMULÁRIO */}
        <section className="card-upload">
          <h3><FaCloudUploadAlt /> NOVO UPLOAD</h3>
          
          <form className="form-upload" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Selecionar Aprendiz</label>
              <select 
                className="input-field" 
                value={aprendizId} 
                onChange={(e) => setAprendizId(e.target.value)}
              >
                <option value="">Escolha o aprendiz...</option>
                {aprendizes.map(aluno => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Mês de Referência</label>
              <input 
                type="month" 
                className="input-field" 
                value={mesReferencia}
                onChange={(e) => setMesReferencia(e.target.value)}
              />
            </div>

            <div className="upload-box">
              <input 
                type="file" 
                id="file-input" 
                accept=".pdf" 
                onChange={(e) => setSelectedFile(e.target.files[0])} 
              />
              <label htmlFor="file-input">
                <FaFilePdf size={30} />
                <p>{selectedFile ? selectedFile.name : "Clique para selecionar o PDF do Contracheque"}</p>
              </label>
            </div>

            <button type="submit" className="btn-enviar-contracheque">
              LIBERAR PARA O APRENDIZ
            </button>
          </form>
        </section>

        {/* COLUNA DIREITA: ÚLTIMOS ENVIOS */}
        <section className="card-historico">
          <h3><FaHistory /> ÚLTIMOS ENVIOS</h3>
          <div className="lista-envios">
            {ultimosEnvios.map(envio => (
              <div key={envio.id} className="item-envio">
                <div className="envio-info">
                  <strong>{envio.aprendiz_nome || envio.nome}</strong>
                  <span>Referência: {envio.mes_referencia || envio.mes}</span>
                </div>
                <div className="envio-data">
                  <span>Enviado em: {new Date(envio.data_upload || envio.data).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
            {ultimosEnvios.length === 0 && (
              <p className="empty-msg">Nenhum envio realizado recentemente.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contracheque;