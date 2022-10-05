import { Router } from 'express';
import { validateReqSchema } from '../../api/Shared/validateReqSchema';
import { verifyAuthToken } from '../Auth/verifyAuthTokenMiddelware';
import { petDeleteController, petPostController, petPutController, petsGetController } from './Controllers';
import { newPetReqSchema, updatePetReqSchema } from './ReqSchemaVaidations';

export const register = (router: Router) => {
  router.use('/pets', verifyAuthToken);

  router.post('/pets', validateReqSchema(newPetReqSchema), petPostController);
  router.get('/pets', petsGetController);
  router.put('/pets/:id', validateReqSchema(updatePetReqSchema), petPutController);
  router.delete('/pets/:id', petDeleteController);
};
