import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1s', target: 10 },
        { duration: '60s', target: 1000 },
      ],
      thresholds: {
          'http_req_duration': ['p(90) < 200']  ,
        },
    };

    let randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export default function() {


    var url = `http://localhost:3000/restaurants/${randomInt(1, 10000000)}/items`;
    var payload = JSON.stringify({
        name: 'AJ test',
        price: 19.99
    });

    var params = {
        headers: {
        'Content-Type': 'application/json',
        },
    };

    http.post(url, payload, params);
}