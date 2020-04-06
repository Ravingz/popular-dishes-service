const cliProgress = require('cli-progress');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const restaurantWriter = createCsvWriter({
    path: './restaurants1.csv',
    header: [
        {id: 'name', title: 'RESTAURANT'},
    ]
});

let restaurantCount = 1000;

const generateRestaurants = () => {
    const restaurants = [];
    for (var i = 0; i < restaurantCount; i++ ) {
        const restaurant = {};
        restaurant.name = faker.company.companyName();
        restaurants.push(restaurant);
    }
    return restaurants;

}

let chunks = 0;

const addRestaurants = () => {
    if (chunks < 10000) {
        chunks += 1;
        const restaurants = generateRestaurants();
        restaurantWriter.writeRecords(restaurants)       // returns a promise
            .then(() => {
                bar.increment();
                addRestaurants();
            });
    } else {
        bar.stop();
    }
}

bar.start(10000, 0);
addRestaurants();

