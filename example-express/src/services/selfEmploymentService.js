// services/selfEmploymentService.js
const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title) => {
    const services = fileService.readData(dataFilePath);
    if (title) {
        const lowerTitle = title.toLowerCase();
        return services.filter(service =>
            service.title.toLowerCase().includes(lowerTitle)
        );
    }
    return services;
};

const findOne = (id) => {
    const services = fileService.readData(dataFilePath);
    return services.find(service => service.id === id) || null;
};

const create = (serviceData) => {
    const services = fileService.readData(dataFilePath);
    const newId = services.length > 0
        ? Math.max(...services.map(s => s.id)) + 1
        : 1;
    const newService = { id: newId, ...serviceData };
    services.push(newService);
    fileService.writeData(dataFilePath, services);
    return newService;
};

const update = (id, serviceData) => {
    const services = fileService.readData(dataFilePath);
    const index = services.findIndex(s => s.id === id);
    if (index === -1) return null;
    services[index] = { ...services[index], ...serviceData };
    fileService.writeData(dataFilePath, services);
    return services[index];
};

const remove = (id) => {
    const services = fileService.readData(dataFilePath);
    const filtered = services.filter(s => s.id !== id);
    if (filtered.length === services.length) return false;
    fileService.writeData(dataFilePath, filtered);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
