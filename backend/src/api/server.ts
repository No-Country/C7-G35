import { createTypeOrmClientConnection } from '../database/TypeOrmClient';
import { App } from './app';

(async () => {
  console.log('starting database conection...');
  await createTypeOrmClientConnection();

  console.log('starting server..');
  const server = new App();
  server.listen();
})();
