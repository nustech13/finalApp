import passport from 'passport';
import passportLocal from 'passport-local';
import { UserModel } from '../model/UserModel.js';

let LocalStrategy = passportLocal.Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err, user) {
    done(err, user);
  }).select("-password");
});
// local sign-up
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
          return done(null, false, { message: "Email is already in use!" });
        }
        if (password !== req.body.confirmPassword) {
          return done(null, false, { message: "Confirm Password not match!" });
        }
        const newUser = new UserModel();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);
// local sign-in
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Sign in unsuccessful!" });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Sign in unsuccessful!" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
