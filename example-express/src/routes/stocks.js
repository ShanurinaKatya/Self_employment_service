// src/routes/stocks.js
const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocksController');

// Определение маршрутов
router.get('/', stocksController.getAllStocks);       // GET /stocks
router.get('/:id', stocksController.getStockById);    // GET /stocks/5
router.post('/', stocksController.createStock);       // POST /stocks
router.patch('/:id', stocksController.updateStock);   // PATCH /stocks/5
router.delete('/:id', stocksController.deleteStock);  // DELETE /stocks/5

module.exports = router;
