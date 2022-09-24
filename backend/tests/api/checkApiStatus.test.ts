import supertestRequest from 'supertest';
import { App } from '../../src/api/app';

const appExpress = new App().getAppExpress();
const api = supertestRequest(appExpress);

test('CheckApiStatus should return a successful response', async () => {
  const response = await api.get('/api/api-status');

  expect(response.status).toEqual(200);
  expect(response.text).toEqual('Ok, Api Online 🐶🚀');
});
