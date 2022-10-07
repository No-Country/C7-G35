import { Router } from 'express';
import { validateReqSchema } from '../../api/Shared/validateReqSchema';
import { verifyAuthToken } from '../Auth/verifyAuthTokenMiddelware';
import { userDeactivateController } from './controllers/UserDeactivateController';
import { userMeGetController } from './controllers/UserMeGetController';
import { userPutController } from './controllers/UserPutControler';
import { updateUserReqSchema } from './reqSchemasValidations';

export const register = (router: Router) => {
  router.use('/users', verifyAuthToken);

  router.get('/users/me', userMeGetController);
  router.put('/users/me', validateReqSchema(updateUserReqSchema), userPutController);
  router.delete('/users/me', userDeactivateController);
};
