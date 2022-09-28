import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import { findUserOrCreate } from '../User/services/findUserOrCreate';
import { googleStrategy } from './services/passportSocialStrategys';
import { createToken } from './services/tokenServices';
import { UserFromGoogle } from './types';

passport.use(googleStrategy);

export const register = (router: Router) => {
  router.get('/login', function (req, res) {
    res.send('login fail');
  });

  router.get('/auth/google', passport.authenticate('google'));
  router.get(
    '/oauth2/redirect/google',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    async function (req: Request, res: Response) {
      const userFromGoogle = req.user as UserFromGoogle;
      try {
        const user = await findUserOrCreate(userFromGoogle);
        const tokenJwt = createToken(user.id);
        res.status(httpStatus.CREATED).send({ user, token: tokenJwt });
      } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).send({ errorMessage: 'auth error' });
      }
    }
  );
};
