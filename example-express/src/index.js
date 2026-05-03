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
    console.log('[' + new Date().toISOString() + '] ' + req.method + ' ' + req.url);
    next();
});

// Подключаем маршруты по новому пути
app.use('/self-employment-services', servicesRouter);

// Раздача статики из папки public (аналог app.useStaticAssets в NestJS)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Перенаправление всех GET-запросов на index.html (SPA)
app.use(function(req, res, next) {
    if (req.method === 'GET') {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    } else {
        next();
    }
});

// 404
app.use(function(req, res) {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Глобальный error handler
app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, function() {
    console.log('Сервер запущен на http://localhost:' + PORT);
});
