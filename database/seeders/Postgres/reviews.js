const cliProgress = require('cli-progress');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const reviewsWriter = createCsvWriter({
    path: './reviews.csv',
    header: [
        {id: 'comment', title: 'COMMENT'},
        {id: 'rating', title: 'RATING'},
        {id: 'item_id', title: 'ITEM ID'},
        {id: 'user_id', title: 'USER ID'},
        {id: 'created', title: 'CREATED DATE'},
        {id: 'updated', title: 'LAST UPDATED'},
    ]
});

let reviewsCount = 1000;
let randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateReviews = () => {
    const reviews = [];
    for (var i = 0; i < reviewsCount; i++ ) {
        const review = {};
        review.comment = faker.lorem.sentences();
        review.rating = randomInt(1, 5);
        review.item_id = randomInt(1, 20000000);
        review.user_id = randomInt(1, 1000000);
        review.created = faker.date.past().toJSON();
        review.updated = faker.date.past().toJSON();
        reviews.push(review);
    }
    return reviews;
};

let chunks = 0;

const addReviews = () => {
    if (chunks < 190) {
        chunks += 1;
        const reviews = generateReviews();
        reviewsWriter.writeRecords(reviews)       // returns a promise
            .then(() => {
                bar.increment();
                addReviews();
            });
    } else {
        bar.stop();
        console.timeEnd();
    }
}

console.time();
bar.start(190, 0);
addReviews();