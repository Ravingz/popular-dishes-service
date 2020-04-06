const cliProgress = require('cli-progress');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const itemsWriter = createCsvWriter({
    path: './items.csv',
    header: [
        {id: 'name', title: 'ITEM NAME'},
        {id: 'restaurantId', title: 'RESTAURANT ID'}
    ]
});

let itemsCount = 1000;
let randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateItems = () => {
    const items = [];
    for (var i = 0; i < itemsCount; i++ ) {
        const item = {};
        item.name = faker.commerce.productName();
        item.restaurantId = randomInt(1, 10000000);
        items.push(item);
    }
    return items;

}

let chunks = 0;

const addItems = () => {
    if (chunks < 100000) {
        chunks += 1;
        const items = generateItems();
        itemsWriter.writeRecords(items)       // returns a promise
            .then(() => {
                bar.increment();
                addItems();
            });
    } else {
        bar.stop();
        console.timeEnd();
    }
}
console.time();
bar.start(100000, 0);
addItems();