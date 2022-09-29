import { Request, Response, Router } from 'express';

export const register = (router: Router) => {
  router.get('/example', function (req: Request, res: Response) {
    res.send('example');
  });
};
