// routes/selfEmploymentRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/selfEmploymentController');

router.get('/', controller.getAllServices);
router.get('/:id', controller.getServiceById);
router.post('/', controller.createService);
router.patch('/:id', controller.updateService);
router.delete('/:id', controller.deleteService);

module.exports = router;
