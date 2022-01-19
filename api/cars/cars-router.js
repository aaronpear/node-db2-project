const express = require('express');
const router = express.Router();
const Car = require('./cars-model.js');

const {
        checkCarId, 
        checkCarPayload, 
        checkVinNumberValid, 
        checkVinNumberUnique 
    } = require('./cars-middleware.js');

router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.getAll();
        res.json(cars);
    } catch (err) {
        next(err);
    }
})

router.get('/:id', checkCarId, async (req, res) => {
    res.json(req.car);
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try { 
        const car = await Car.create(req.body);
        res.status(201).json(car);
    } catch (err) {
        next(err);
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
})

module.exports = router;
