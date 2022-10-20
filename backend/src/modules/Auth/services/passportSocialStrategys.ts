import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { configEnv } from '../config';
import { UserFromSocials } from '../types';
import { Strategy as FacebookStrategy } from 'passport-facebook';

const apiHomeURL = configEnv.backendHomeUrl;

export const googleStrategy = new GoogleStrategy(
  {
    clientID: configEnv.googleCredentials.clientID,
    clientSecret: configEnv.googleCredentials.clientSecret,
    callbackURL: `${apiHomeURL}/api/oauth2/redirect/google` || '/api/oauth2/redirect/google',
    scope: ['profile', 'email']
  },
  function (accessToken, refreshToken, profile, cb) {
    const user: UserFromSocials = {
      id: profile.id + 'g',
      name: profile.displayName,
      picture: profile._json.picture,
      email: profile._json.email || ''
    };

    return cb(null, user);
  }
);

export const facebookStrategy = new FacebookStrategy(
  {
    clientID: configEnv.facebookCredentials.appID,
    clientSecret: configEnv.facebookCredentials.appSecret,
    callbackURL: `${apiHomeURL}/api/oauth2/redirect/facebook` || '/api/oauth2/redirect/facebook',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function (accessToken, refreshToken, profile, cb) {
    const user: UserFromSocials = {
      id: profile.id + 'f',
      name: profile.displayName,
      picture: profile._json.picture.data.url || '',
      email: profile._json.email || ''
    };
    return cb(null, user);
  }
);
