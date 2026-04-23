// src/index.js
const express = require('express');
const path = require('path');
const servicesRouter = require('./routes/selfEmploymentRoutes');
const servicesService = require('./services/selfEmploymentService');

const app = express();
const PORT = 3000;

// Путь к новому файлу данных
const DATA_FILE_PATH = path.join(__dirname, 'data', 'selfEmployment.json');

// Инициализация сервиса
servicesService.init(DATA_FILE_PATH);

app.use(express.json());

// Логгер
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Подключаем маршруты по новому пути
app.use('/self-employment-services', servicesRouter);

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Глобальный error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
