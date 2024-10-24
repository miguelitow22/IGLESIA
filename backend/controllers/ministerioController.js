const Ministerio = require('../models/Ministerio');

exports.getMinisterios = async (req, res) => {
    try {
        const ministerios = await Ministerio.findAll();
        res.status(200).json(ministerios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
