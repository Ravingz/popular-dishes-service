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
  // let res = http.get(`http://localhost:3000/restaurants/${randomInt(1, 10000000)}/items`);
  let res = http.post(`http:/localhost:3000/restaurants/${randomInt(1, 10000000)}/items`)
  check(res, {
    'status was 200': r => r.status == 200,
    'transaction time OK': r => r.timings.duration < 200,
  });
  sleep(1);
}