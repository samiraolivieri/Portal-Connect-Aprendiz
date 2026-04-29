import React, { useEffect, useState } from 'react';
import '../../styles/Justificativas.css';
import { FaCloudUploadAlt, FaHistory, FaFileAlt } from 'react-icons/fa';
import axios from 'axios';
const Justificativas = () => {
  const usuarioLogado = localStorage.getItem("usuario");

  const usuarioObj = usuarioLogado ? JSON.parse(usuarioLogado) : null;
  const userId = usuarioObj ? usuarioObj.id : '';
  const [formData, setFormData] = useState({
    titulo: '',
    motivo: '',
    data: '',
    //dataFim: '',
    arquivo: null,
    descricao: '',
    aprendiz_id: userId
  });
  const estadoInicial = {
    titulo: '',
    motivo: '',
    arquivo: null,
    descricao: '',
    aprendiz_id: userId
  };

  const [historico, setHistorico] = useState([]);
  useEffect(() => {
    const buscarHistorico = async () => {
      if (!userId) return

      try {
        const resposta = await axios.get(`http://localhost:5000/api/atestados/listar/${userId}`)
        setHistorico(resposta.data)
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    }
    buscarHistorico()

  }, [userId])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleEnviar = async (e) => {
    if (e) e.preventDefault();



    const data = new FormData();
    data.append('aprendiz_id', formData.aprendiz_id);
    data.append('titulo', formData.titulo);
    data.append('motivo', formData.motivo);
    data.append('descricao', formData.descricao);
    data.append('data_emissao', formData.data);

    data.append('atestado', formData.arquivo);

    try {
      const resposta = await axios.post("http://localhost:5000/api/atestados/enviar", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Sucesso:", resposta.data);
      alert("Atestado enviado com sucesso!");
      const novaLista = await axios.get(`http://localhost:5000/api/atestados/listar/${userId}`);
      setHistorico(novaLista.data);

      setFormData(estadoInicial);
      e.target.reset();
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data || error.message);
      alert("Erro ao enviar atestados. Verifique o console.");
    }
  };


  return (
    <div className="atestado-container">
      <header className="dash-header">
        <h1>REGISTRO DE JUSTIFICATIVAS</h1>
      </header>

      <div className="atestado-grid">
        {/* Formulário de Envio */}
        <section className="form-atestado">
          <h3><FaFileAlt /> NOVA JUSTIFICATIVA</h3>

          <div className="form-group">
            <label>Título da Justificativa</label>
            <input
              type="text"
              name="titulo"
              placeholder="Ex: Atestado Médico - Clínica Geral"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <form onSubmit={handleEnviar}>
            <div className="form-group">
              <label>Motivo do Afastamento</label>
              <select name="motivo" onChange={handleChange} required>
                <option value="">Selecione...</option>
                <option value="medico">Atestado Médico</option>
                <option value="luto">Luto</option>
                <option value="militar">Serviço Militar</option>
                <option value="outros">Outros</option>
              </select>
            </div>


            <div className="form-row">
              <div className="form-group">
                <label>Data</label>
                <input type="date" name="data" onChange={handleChange} required />
              </div>
              {/*          <div className="form-group">
                <label>Data Fim</label>
                <input type="date" name="dataFim" onChange={handleChange} required />
              </div>
            
*/}
            </div>
            <div className="form-group">
              <label className="upload-label">
                <FaCloudUploadAlt /> Upload do Documento (PDF/JPG)
                <input type="file" name="arquivo" onChange={handleChange} accept=".pdf,.jpg,.png" required />
              </label>
              {formData.arquivo && <span className="file-name">{formData.arquivo.name}</span>}
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea name="descricao" rows="3" onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn-enviar">ENVIAR</button>
          </form>
        </section>

        <section className="historico-atestados">
          <h3><FaHistory /> ÚLTIMOS ENVIOS</h3>
          <div className="lista-historico">
            {historico.map(item => (
              <div key={item.id} className="historico-item">
                <div className="historico-info">
                  <strong>{item.titulo}</strong>
                  <span> Enviado em: {new Date(item.data_emissao).toLocaleDateString('pt-BR')}</span>
                </div>
                <span className={`status-badge ${item.status.replace(' ', '-').toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Justificativas;