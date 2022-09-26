import { App } from './app';

(async () => {
  console.log('starting server..');
  const server = new App();
  server.listen();
})();
