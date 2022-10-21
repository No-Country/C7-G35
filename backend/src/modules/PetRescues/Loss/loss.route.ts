import { Router } from 'express';
import { verifyAuthToken } from '../../Auth/verifyAuthTokenMiddelware';
import {
  lastLossGetController,
  lossByFiltersGetController,
  lossByUserGetController,
  lossFromPetPostController,
  lossGetController,
  lossIsRecoveredPutController,
  lossPostController,
  lossPutController
} from './Controllers';

export const register = (router: Router) => {
  router.get('/loss/last', lastLossGetController);
  router.get('/loss/by', lossByFiltersGetController);
  router.get('/loss/:id', lossGetController);

  router.use('/loss', verifyAuthToken);

  router.post('/loss', lossPostController);
  router.post('/loss/:petId', lossFromPetPostController);
  router.put('/loss/:id', lossPutController);
  router.put('/loss/:id/recovered', lossIsRecoveredPutController);
  router.get('/loss', lossByUserGetController);
};
