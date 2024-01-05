import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../app/models/User.js';
import generateJWT from '../utils/generateJWT.js';

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username, password }, (err, user) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Sai tên đăng nhập hoặc mật khẩu',
        });
      }
      const token = generateJWT(user);
      return done(null, user, { token });
    });
  }),
);

export default passport;
