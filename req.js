const BASE_URL = 'http://localhost:3200';

const registerBody = {
  name: 'Samet',
  lastname: 'Sarıçiçek',
  birthDate: new Date(),
  email: 'samet@gmail.com',
  password: 'Samet.1502',
};

const loginBody = {
  email: 'samet@gmail.com',
  password: 'Samet.1502',
};

const registerParams = ['POST', registerBody, 'user/register'];
const loginParams = ['POST', loginBody, 'user/login'];
const userInfoParams = ['GEt', {}, 'user/userInfo'];

const fetcher = async (method, bodys, url) => {
  const body = JSON.stringify(bodys);
  const x = fetch([BASE_URL, url].join('/'), {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(method === 'GET' ? { body } : {}),
  });

  await x
    .then((res) => {
      console.log('First Response');
      console.table(res);
      return res.json();
    })
    .then((res) => {
      console.log('Second Response');
      console.table(res);
    })
    .catch(console.error);
};

fetcher(...userInfoParams);
