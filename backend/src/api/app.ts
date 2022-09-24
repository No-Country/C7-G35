import cors from 'cors';
import express, { Router } from 'express';
import { CheckApiStatus } from './CheckApiStatus.route';

export class App {
  private app: express.Express;
  private port: string;
  readonly apiPath = '/api';

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.middlewares();
    this.initRoutes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes() {
    const router = Router();
    this.app.use('/api', router);

    CheckApiStatus(router);
  }

  async listen() {
    this.app.listen(this.port, () => {
      console.log(` App🐶 is running at http://localhost:${this.port}${this.apiPath} 🚀`);
      console.log(' Press CTRL-C to stop\n');
    });
  }

  getAppExpress() {
    return this.app;
  }
}
