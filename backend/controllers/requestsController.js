const nodemailer = require('nodemailer');
const Request = require('../models/Request');

// Configuración del transporte de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // Tu dirección de correo
        pass: process.env.EMAIL_PASS // Tu contraseña
    }
});

exports.createRequest = async (req, res) => {
    const { tipoSolicitud, fechaProyeccion, ministerioId, correoMinisterio, informacion } = req.body;

    // Validaciones
    if (!tipoSolicitud || !fechaProyeccion || !ministerioId || !correoMinisterio || !informacion) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const newRequest = await Request.create(req.body);

        // Datos para el correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: [correoMinisterio, process.env.EMAIL_USER], // Correo del ministerio y tu correo
            subject: 'Nueva Solicitud de Material Audiovisual',
            text: `Se ha recibido una nueva solicitud:\n\nTipo de Solicitud: ${tipoSolicitud}\nFecha de Proyección: ${fechaProyeccion}\nMinisterio: ${ministerioId}\nInformación: ${informacion}`
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');

        res.status(201).json(newRequest);
    } catch (err) {
        console.error('Error al enviar el correo:', err);
        res.status(500).json({ error: err.message });
    }
};
