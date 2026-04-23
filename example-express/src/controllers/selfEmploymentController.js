// controllers/selfEmploymentController.js
const serviceLayer = require('../services/selfEmploymentService');

const getAllServices = (req, res) => {
    const { title } = req.query;
    const services = serviceLayer.findAll(title);
    res.json(services);
};

const getServiceById = (req, res) => {
    const id = parseInt(req.params.id);
    const service = serviceLayer.findOne(id);
    if (!service) {
        return res.status(404).json({ error: 'Услуга не найдена' });
    }
    res.json(service);
};

const createService = (req, res) => {
    const { src, title, text } = req.body;
    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены (src, title, text)' });
    }
    const newService = serviceLayer.create({ src, title, text });
    res.status(201).json(newService);
};

const updateService = (req, res) => {
    const id = parseInt(req.params.id);
    const updated = serviceLayer.update(id, req.body);
    if (!updated) {
        return res.status(404).json({ error: 'Услуга не найдена' });
    }
    res.json(updated);
};

const deleteService = (req, res) => {
    const id = parseInt(req.params.id);
    const success = serviceLayer.remove(id);
    if (!success) {
        return res.status(404).json({ error: 'Услуга не найдена' });
    }
    res.status(204).send();
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};
