const cars = [
    {
        vin: '1111111111111',
        make: 'honda',
        model: 'civic',
        mileage: 12345,
        title: 'clean',
        transmission: 'automatic'
    },
    {
        vin: '2222222222222',
        make: 'ford',
        model: 'escape',
        mileage: 1245,
        title: 'clean',
        transmission: 'automatic'
    },
    {
        vin: '3333333333333',
        make: 'subaru',
        model: 'outback',
        mileage: 123456
    }
];

exports.seed = function (knex) {
    return knex('cars').truncate().then(() => {
        return knex('cars').insert(cars);
    })
}