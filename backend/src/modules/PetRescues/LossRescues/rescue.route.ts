import { Router } from 'express';
import { verifyAuthToken } from '../../Auth/verifyAuthTokenMiddelware';
import {
  ByUserGetController,
  lastRescueGetController,
  rescueByFiltersGetController,
  rescueGetController,
  rescuePostController,
  rescuePutController
} from './controllers';

export const register = (router: Router) => {
  router.get('/rescues/last', lastRescueGetController);
  router.get('/rescues/by', rescueByFiltersGetController);
  router.get('/rescues/:id', rescueGetController);

  router.use('/rescues', verifyAuthToken);

  router.post('/rescues', rescuePostController);
  router.put('/rescues/:id', rescuePutController);
  router.get('/rescues', ByUserGetController);
};
