// passport-facebook.js
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import User from '../app/models/User.js';
import generateJWT from '../utils/generateJWT.js';
import mongoose from 'mongoose';

passport.use(
  new FacebookStrategy(
    {
      clientID: '1032980924647666',
      clientSecret: '043f089630e4efc7b5dca343844cc9e8',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate(
        {
          facebookId: profile.id,
          username: profile.displayName,
        },
        (err, user) => {
          if (err) {
            console.log(err);
            return done(err);
          }

          const token = generateJWT(user);

          return done(null, { user, token });
        },
      );
    },
  ),
);

export default passport;
