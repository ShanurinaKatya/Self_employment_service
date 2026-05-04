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
    const { title, text, src, badge, result, term, price, documents } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Введите название услуги' });
    }
    const newService = serviceLayer.create({ title, text, src, badge, result, term, price, documents });
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
