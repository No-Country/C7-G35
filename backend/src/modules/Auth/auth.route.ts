import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import { findUserOrCreate } from '../User/services/findUserOrCreate';
import { facebookStrategy, googleStrategy } from './services/passportSocialStrategys';
import { createToken } from './services/tokenServices';
import { UserFromSocials } from './types';

passport.use(googleStrategy);
passport.use(facebookStrategy);

export const register = (router: Router) => {
  router.get('/login', function (req, res) {
    res.send('login fail');
  });

  router.get('/auth/google', passport.authenticate('google'));
  router.get(
    '/oauth2/redirect/google',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    async function (req: Request, res: Response) {
      const userFromGoogle = req.user as UserFromSocials;
      try {
        const user = await findUserOrCreate(userFromGoogle);
        const tokenJwt = createToken(user.id);
        res.status(httpStatus.CREATED).send({ user, token: tokenJwt });
      } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).send({ errorMessage: 'auth error' });
      }
    }
  );

  router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  router.get(
    '/oauth2/redirect/facebook',
    passport.authenticate('facebook', {
      failureRedirect: '/login',
      session: false,
      scope: ['email']
    }),
    async function (req: Request, res: Response) {
      const userFromFacebook = req.user as UserFromSocials;
      try {
        const user = await findUserOrCreate(userFromFacebook);
        const tokenJwt = createToken(user.id);
        res.status(httpStatus.CREATED).send({ user, token: tokenJwt });
      } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).send({ errorMessage: 'auth error' });
      }
    }
  );
};
