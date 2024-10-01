const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
    try {
        const newRequest = await Request.create(req.body);
        res.status(201).json(newRequest);
    } catch (err) {
        console.error('Error en createRequest:', err);
        res.status(500).json({ error: 'Error al crear la solicitud', message: err.message });
    }
};
