import { Router } from 'express';
import { verifyAuthToken } from '../../Auth/verifyAuthTokenMiddelware';
import { lastLossGetController, lossByUserGetController, lossPostController, lossPutController } from './Controllers';

export const register = (router: Router) => {
  router.get('/loss/last', lastLossGetController);

  router.use('/loss', verifyAuthToken);

  router.post('/loss', lossPostController);
  router.put('/loss/:id', lossPutController);
  router.get('/loss', lossByUserGetController);
};
