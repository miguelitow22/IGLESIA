const express = require('express');
const router = express.Router();
const { getMinisterios } = require('../controllers/ministerioController');

router.get('/', getMinisterios);

module.exports = router;
  