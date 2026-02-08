const mongoose = require('mongoose');
const City = require('./models/Cities.js');
let cities = require('./cities.json');
require('dotenv').config();
cities = cities.filter((city, index, self) =>
    index === self.findIndex((c) => c.name === city.name)
);


mongoose.connect(process.env.MONGODB_URI, {
})
.then(async () => {
    console.log('Connected to MongoDB');

    try {
        await City.deleteMany({});
        await City.insertMany(cities);
        console.log('Cities seeded successfully');
    } catch (seedError) {
        console.error('Error seeding cities:', seedError);
    } finally {
        mongoose.connection.close();
    }
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
