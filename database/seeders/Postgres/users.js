const cliProgress = require('cli-progress');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const usersWriter = createCsvWriter({
    path: './users.csv',
    header: [
        {id: 'firstname', title: 'FIRST NAME'},
        {id: 'lastname', title: 'LAST NAME'},
        {id: 'follower_count', title: 'FOLLOWER COUNT'},
        {id: 'created', title: 'DATE CREATED'},
    ]
});

let userCount = 1000;
let randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateUsers = () => {
    const users = [];
    for (var i = 0; i < userCount; i++ ) {
        const user = {};
        user.firstname = faker.name.firstName();
        user.lastname = faker.name.lastName();
        user.follower_count = randomInt(1, 500);
        user.created = faker.date.past().toJSON();
        users.push(user);
    }
    return users;

}

let chunks = 0;

const addUsers = () => {
    if (chunks < 1000) {
        chunks += 1;
        const users = generateUsers();
        usersWriter.writeRecords(users)       // returns a promise
            .then(() => {
                bar.increment();
                addUsers();
            });
    } else {
        bar.stop();
        console.timeEnd();
    }
}
console.time();
bar.start(1000, 0);
addUsers();