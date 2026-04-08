// src/index.js
const express = require('express');
const path = require('path');
const stocksRouter = require('./routes/stocks');
const stocksService = require('./services/stocksService');

const app = express();
const PORT = 3000;

// Абсолютный путь к файлу данных
const DATA_FILE_PATH = path.join(__dirname, 'data', 'stocks.json');

// Инициализируем сервис (передаём путь к файлу)
stocksService.init(DATA_FILE_PATH);

// 1. Встроенный middleware для парсинга JSON в теле запроса
app.use(express.json());

// 2. Собственный middleware для логирования каждого запроса
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // без вызова next() запрос "зависнет"
});

// 3. Подключаем маршруты к пути /stocks
app.use('/stocks', stocksRouter);

// 4. Обработка 404 (маршрут не найден)
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// 5. Глобальный обработчик ошибок (должен быть после всех middleware и маршрутов)
app.use((err, req, res, next) => {
    console.error('Ошибка сервера:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// 6. Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
