import { config } from 'dotenv';
config();

export const configEnv = {
  secretKey: process.env.SECRET_KEY || 'dev',
  googleCredentials: {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
  },
  facebookCredentials: {
    appID: process.env.FACEBOOK_APP_ID || '',
    appSecret: process.env.FACEBOOK_APP_SECRET || ''
  }
};
