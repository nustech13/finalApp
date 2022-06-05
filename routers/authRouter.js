import express from "express";
import { AuthController } from "../controller/authController.js";
import { check } from "express-validator";
import passport from "passport";
const authRouter = express.Router();
authRouter.get("/signin", AuthController.getViewSignin);
authRouter.post(
  "/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/feeds",
    failureRedirect: "/auth/signin",
    failureFlash: true,
  })
);
authRouter.get("/logout", AuthController.logout);
authRouter.get("/signup", AuthController.getViewSignup);
authRouter.post(
  "/signup",
  [
    check("firstName", "First Name maximum 25 characters long").isLength({
      max: 25,
    }),
    check("lastName", "Last Name maximum 25 characters long").isLength({
      max: 25,
    }),
    check("email", "Your email is not valid").isEmail(),
    check("email", "Your email maximum 255 characters long").isLength({
      max: 255,
    }),
    check("password", "Your password must be from 6 to 64 characters").isLength(
      {
        min: 6,
        max: 64,
      }
    ),
  ],
  AuthController.signup,
  passport.authenticate("local.signup", {
    successRedirect: "/auth/signin",
    failureRedirect: "/auth/signup",
    failureFlash: true,
  })
);
export default authRouter;
