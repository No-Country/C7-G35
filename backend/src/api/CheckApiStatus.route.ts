import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

export const CheckApiStatus = (router: Router): void => {
  router.get('/api-status', (req: Request, res: Response) => {
    res.status(httpStatus.OK).send('Ok, Api Online 🐶🚀');
  });
};
