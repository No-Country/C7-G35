import { Router } from 'express';
import { verifyAuthToken } from '../../Auth/verifyAuthTokenMiddelware';
import {
  ByUserGetController,
  lastRescueGetController,
  rescueByFiltersGetController,
  rescuePostController,
  rescuePutController
} from './controllers';

export const register = (router: Router) => {
  router.get('/rescues/last', lastRescueGetController);
  router.get('/rescues/by', rescueByFiltersGetController);

  router.use('/rescues', verifyAuthToken);

  router.post('/rescues', rescuePostController);
  router.put('/rescues/:id', rescuePutController);
  router.get('/rescues', ByUserGetController);
};
