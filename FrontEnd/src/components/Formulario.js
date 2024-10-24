import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Formulario.css';
import firma from '../images/Captura de pantalla (29).png';

const Formulario = () => {
    const [ministerio, setMinisterio] = useState('');
    const [correoMinisterio, setCorreoMinisterio] = useState('');
    const [tipoSolicitud, setTipoSolicitud] = useState('');
    const [informacion, setInformacion] = useState('');
    const [ministerios, setMinisterios] = useState([]);
    const [fechaProyeccion, setFechaProyeccion] = useState('');

    useEffect(() => {
        // Fetch ministerios from the backend
        const fetchMinisterios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/ministerios');
                setMinisterios(response.data);
            } catch (error) {
                console.error('Error fetching ministerios:', error);
            }
        };

        fetchMinisterios();
    }, []);

    const handleMinisterioChange = (e) => {
        const selectedMinisterio = e.target.value;
        setMinisterio(selectedMinisterio);

        const ministerioData = ministerios.find(m => m.nombre === selectedMinisterio);
        if (ministerioData) {
            setCorreoMinisterio(ministerioData.correo);
        }
    };

    const formatearFecha = (fecha) => {
        const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(fecha).toLocaleDateString("en-US", opciones);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Encuentra el ID del ministerio seleccionado
            const selectedMinisterio = ministerios.find(m => m.nombre === ministerio);
            const ministerioId = selectedMinisterio ? selectedMinisterio.id : null;

            // Validaciones
            if (!tipoSolicitud || !fechaProyeccion || !ministerioId || !informacion) {
                alert("Por favor, completa todos los campos requeridos.");
                return;
            }

            await axios.post('http://localhost:5000/api/requests', {
                tipoSolicitud,
                fechaProyeccion,
                ministerioId,
                correoMinisterio,
                informacion,
                fechasImportantes: '' // Si no tienes fechas importantes, puedes dejar esto vacío
            });
            alert('Solicitud enviada!');
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="title-container">
                <h1>SOLICITUD DE</h1>
                <h2 className="material">MATERIAL</h2>
                <h3 className="audiovisual">AUDIOVISUAL</h3> 
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group section-title-ministerio">
                    <h2>Ministerio</h2>
                    <select value={ministerio} onChange={handleMinisterioChange} required>
                        <option value="">Elegir</option>
                        {ministerios.map((m) => (
                            <option key={m.id} value={m.nombre}>{m.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Correo del Ministerio:</label>
                    <input type="email" value={correoMinisterio} readOnly required />
                </div>
                <div className="form-group section-title-solicitud radio-group">
                    <h2>Tipo de solicitud</h2>
                    <label>
                        <input 
                            type="radio" 
                            name="tipoSolicitud" 
                            value="Imagen" 
                            checked={tipoSolicitud === 'Imagen'} 
                            onChange={(e) => setTipoSolicitud(e.target.value)}
                        />
                        Imagen
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="tipoSolicitud" 
                            value="Video" 
                            checked={tipoSolicitud === 'Video'} 
                            onChange={(e) => setTipoSolicitud(e.target.value)}
                        />
                        Video
                    </label>
                </div>
                <div className="form-group section-title-fecha">
                    <h2>Fecha de Proyección</h2>
                    <input 
                        type="date" 
                        value={fechaProyeccion} 
                        onChange={(e) => setFechaProyeccion(e.target.value)} 
                        required 
                    />
                    {/* Mostrar la fecha formateada como MM/DD/YYYY */}
                    <p>Fecha seleccionada: {fechaProyeccion ? formatearFecha(fechaProyeccion) : "No seleccionada"}</p>
                </div>
                <div className="form-group section-title-info">
                    <h2>Información que debe llevar el video o imagen</h2>
                    <p>Especificar fechas importantes en caso de eventos</p>
                    <textarea 
                        value={informacion} 
                        onChange={(e) => setInformacion(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Enviar</button>
                </div>
            </form>
            {/* Imagen de firma o logo */}
            <div className="logo-container">
                <img src={firma} alt="Firma" />
            </div>
        </div>
    );
};

export default Formulario;
