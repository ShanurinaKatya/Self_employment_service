// src/services/stocksService.js
const fileService = require('./fileService');

let dataFilePath; // будет установлен при инициализации

/**
 * Инициализирует сервис путём к файлу данных.
 * @param {string} filePath
 */
const init = (filePath) => {
    dataFilePath = filePath;
};

/**
 * Возвращает все карточки. Если передан параметр title, фильтрует по вхождению (без учёта регистра).
 * @param {string} title - опциональный поисковый запрос
 * @returns {Array}
 */
const findAll = (title) => {
    const stocks = fileService.readData(dataFilePath);
    if (title) {
        const lowerTitle = title.toLowerCase();
        return stocks.filter(stock =>
            stock.title.toLowerCase().includes(lowerTitle)
        );
    }
    return stocks;
};

/**
 * Ищет карточку по id.
 * @param {number} id
 * @returns {Object|null}
 */
const findOne = (id) => {
    const stocks = fileService.readData(dataFilePath);
    return stocks.find(stock => stock.id === id) || null;
};

/**
 * Создаёт новую карточку. id генерируется автоматически (максимальный id + 1).
 * @param {Object} stockData - поля src, title, text
 * @returns {Object} - созданная карточка с присвоенным id
 */
const create = (stockData) => {
    const stocks = fileService.readData(dataFilePath);
    const newId = stocks.length > 0
        ? Math.max(...stocks.map(s => s.id)) + 1
        : 1;
    const newStock = { id: newId, ...stockData };
    stocks.push(newStock);
    fileService.writeData(dataFilePath, stocks);
    return newStock;
};

/**
 * Обновляет существующую карточку. Принимает частичные данные (PATCH).
 * @param {number} id
 * @param {Object} stockData - любые поля для обновления
 * @returns {Object|null} - обновлённая карточка или null, если не найдена
 */
const update = (id, stockData) => {
    const stocks = fileService.readData(dataFilePath);
    const index = stocks.findIndex(s => s.id === id);
    if (index === -1) return null;

    stocks[index] = { ...stocks[index], ...stockData };
    fileService.writeData(dataFilePath, stocks);
    return stocks[index];
};

/**
 * Удаляет карточку по id.
 * @param {number} id
 * @returns {boolean} - true если удаление произошло, false если карточка не найдена
 */
const remove = (id) => {
    const stocks = fileService.readData(dataFilePath);
    const filteredStocks = stocks.filter(s => s.id !== id);
    if (filteredStocks.length === stocks.length) return false;

    fileService.writeData(dataFilePath, filteredStocks);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
