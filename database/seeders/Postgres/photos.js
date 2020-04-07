const cliProgress = require('cli-progress');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const photosWriter = createCsvWriter({
    path: './photos.csv',
    header: [
        {id: 'url', title: 'URL'},
        {id: 'caption', title: 'CAPTION'},
        {id: 'userId', title: 'USER ID'},
        {id: 'itemId', title: 'ITEM ID'},
        {id: 'uploaded', title: "UPLOADED DATE"}
    ]
});

let photosCount = 1000;
let randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generatePhotos = () => {
    const photos = [];
    for (var i = 0; i < photosCount; i++ ) {
        const photo = {};
        photo.url = `https://ravingzbucket.s3.us-east-2.amazonaws.com/popularDishes/photo${randomInt(1, 999)}.jpg`
        photo.caption = faker.lorem.sentence();
        photo.itemId = randomInt(1, 100000000);
        photo.uploaded = faker.date.past().toString().slice(0, 33);
        photos.push(photo);
    }
    return photos;

}

let chunks = 0;

const addPhotos = () => {
    if (chunks < 500) {
        chunks += 1;
        const photos = generatePhotos();
        photosWriter.writeRecords(photos)       // returns a promise
            .then(() => {
                bar.increment();
                addPhotos();
            });
    } else {
        bar.stop();
        console.timeEnd();
    }
}
console.time();
bar.start(500, 0);
addPhotos();