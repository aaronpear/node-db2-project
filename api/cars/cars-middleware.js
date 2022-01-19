const vinValidator = require('vin-validator');
const Car = require('./cars-model.js');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id);
    if (!car) {
      next({ status: 404, message: 'Car not found' })
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;

  if (!vin) {
    next({ status: 400, message: 'vin is missing' });
  } else if (!make) {
    next({ status: 400, message: 'make is missing' });
  } else if (!model) {
    next({ status: 400, message: 'model is missing' });
  } else if (!mileage) {
    next({ status: 400, message: 'mileage is missing' });
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  const valid = vinValidator.validate(req.body.vin);
  if (!valid) {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existingVin = await Car.getByVin(req.body.vin);

    if (existingVin) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { 
  checkCarId, 
  checkCarPayload, 
  checkVinNumberValid, 
  checkVinNumberUnique 
};