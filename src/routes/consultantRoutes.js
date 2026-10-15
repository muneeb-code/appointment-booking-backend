const express = require('express');
const router = express.Router();
const consultantController = require('../controllers/consultantController');

router.post('/', consultantController.createConsultant);
router.get('/', consultantController.getConsultants);

module.exports = router;