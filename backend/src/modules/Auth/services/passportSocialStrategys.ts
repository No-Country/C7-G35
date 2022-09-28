import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { configEnv } from '../config';
import { UserFromGoogle } from '../types';

export const googleStrategy = new GoogleStrategy(
  {
    clientID: configEnv.googleCredentials.clientID,
    clientSecret: configEnv.googleCredentials.clientSecret,
    callbackURL: '/api/oauth2/redirect/google',
    scope: ['profile', 'email']
  },
  function (accessToken, refreshToken, profile, cb) {
    const user: UserFromGoogle = {
      id: profile.id,
      name: profile.displayName,
      picture: profile._json.picture,
      email: profile._json.email || ''
    };

    return cb(null, user);
  }
);
