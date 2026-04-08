
const fs = require('fs');

/**
 * Синхронно читает файл по указанному пути и возвращает распарсенный JSON.
 * @param {string} filePath - абсолютный путь к файлу
 * @returns {Array|Object} - данные из файла (в нашем случае всегда массив)
 */
const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Ошибка чтения файла:', err);
        return []; // при ошибке возвращаем пустой массив
    }
};

/**
 * Синхронно записывает данные в файл в формате JSON с отступами.
 * @param {string} filePath - абсолютный путь к файлу
 * @param {Array|Object} data - данные для записи
 */
const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Ошибка записи файла:', err);
    }
};

module.exports = {
    readData,
    writeData
};
