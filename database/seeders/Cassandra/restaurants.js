const cliProgress = require('cli-progress');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const cassRestaurantWriter = createCsvWriter({
    path: './cassRestaurants.csv',
    header: [
        {id: 'rest_id', title: 'RESTAURANT ID'},
        {id: 'item_id', title: 'ITEM ID'},
        {id: 'item_name', title: 'ITEM NAME'},
        {id: 'item_price', title: 'ITEM PRICE'},
        {id: 'photo_caption', title: 'PHOTO CAPTION'},
        {id: 'photo_id', title: 'PHOTO ID'},
        {id: 'photo_url', title: 'PHOTO URL'},
        {id: 'rest_name', title: 'RESTAURANT NAME'},
        {id: 'rev_comment', title: 'REVIEW'},
        {id: 'rev_created', title: 'REVIEW CREATED'},
        {id: 'rev_id', title: 'REVIEW ID'},
        {id: 'rev_rating', title: 'RATING'},
        {id: 'user_firstname', title: 'FIRSTNAME'},
        {id: 'user_follower_count', title: 'FOLLOWERS'},
        {id: 'user_id', title: 'USER ID'},
        {id: 'user_lastname', title: 'LASTNAME'}, 
    ]
});

let restaurantsCount = 1000;
let randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateRestaurants = () => {
    const restaurants = [];
    for (var i = 0; i < restaurantsCount; i++ ) {
        const restaurant = {
            rest_id: randomInt(1, 10000000),
            item_id: randomInt(1, 100000000),
            item_name: faker.commerce.productName(),
            item_price: faker.finance.amount(10, 100, 2),
            photo_caption: faker.lorem.sentence(),
            photo_id: randomInt(1, 40000000),
            photo_url: `https://ravingzbucket.s3.us-east-2.amazonaws.com/popularDishes/photo${randomInt(1, 999)}.jpg`,
            rest_name: faker.company.companyName(),
            rev_comment: faker.lorem.sentences(),
            rev_created: faker.date.past().toJSON(),
            rev_id: randomInt(1, 40000000),
            rev_rating: randomInt(1, 5),
            user_firstname: faker.name.firstName(),
            user_follower_count: randomInt(1, 400),
            user_id: randomInt(1, 1000000),
            user_lastname: faker.name.lastName(),
        };

        restaurants.push(restaurant);
    }
    return restaurants;

}

let chunks = 0;

const addRestaurants = () => {
    if (chunks < 50000) {
        chunks += 1;
        const restaurants = generateRestaurants();
        cassRestaurantWriter.writeRecords(restaurants)       // returns a promise
            .then(() => {
                bar.increment();
                addRestaurants();
            });
    } else {
        bar.stop();
        console.timeEnd();
    }
}
console.time();
bar.start(50000, 0);
addRestaurants();
