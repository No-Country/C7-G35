import { Router } from 'express';
import { verifyAuthToken } from '../Auth/verifyAuthTokenMiddelware';
import { userDeactivateController } from './controllers/UserDeactivateController';
import { userMeGetController } from './controllers/UserMeGetController';
import { userPutController } from './controllers/UserPutControler';

export const register = (router: Router) => {
  router.use('/users', verifyAuthToken);

  router.get('/users/me', userMeGetController);
  router.put('/users/me', userPutController);
  router.delete('/users/me', userDeactivateController);
};
