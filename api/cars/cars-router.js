const express = require('express');
const Car = require('./cars-model.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.getAll();
        res.json(cars);
    } catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const car = await Car.getById(req.params.id);
        res.json(car);
    } catch (err) {
        next(err);
    }
})

router.post('/', (req, res, next) => {
    res.json('posting')
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
})

module.exports = router;
