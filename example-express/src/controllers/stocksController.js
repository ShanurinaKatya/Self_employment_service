// src/controllers/stocksController.js
const stocksService = require('../services/stocksService');

/**
 * GET /stocks
 * Получить все карточки, возможно с фильтром по title
 */
const getAllStocks = (req, res) => {
    const { title } = req.query;
    const stocks = stocksService.findAll(title);
    res.json(stocks);
};

/**
 * GET /stocks/:id
 * Получить одну карточку по id
 */
const getStockById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const stock = stocksService.findOne(id);
    if (!stock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    res.json(stock);
};

/**
 * POST /stocks
 * Создать новую карточку. Ожидает JSON с полями src, title, text.
 */
const createStock = (req, res) => {
    const { src, title, text } = req.body;
    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены (src, title, text)' });
    }
    const newStock = stocksService.create({ src, title, text });
    res.status(201).json(newStock);
};

/**
 * PATCH /stocks/:id
 * Обновить существующую карточку (частично)
 */
const updateStock = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedStock = stocksService.update(id, req.body);
    if (!updatedStock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    res.json(updatedStock);
};

/**
 * DELETE /stocks/:id
 * Удалить карточку
 */
const deleteStock = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const success = stocksService.remove(id);
    if (!success) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    res.status(204).send(); // 204 No Content – тело ответа пустое
};

module.exports = {
    getAllStocks,
    getStockById,
    createStock,
    updateStock,
    deleteStock
};
