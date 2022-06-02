import express from "express";
import { check, validationResult } from "express-validator";
import passport from "passport";
const authRouter = express.Router();
authRouter.get("/login", (req, res) => {
  var messages = req.flash("error");
  res.render("login/login", {
    messages: messages,
    hasErrors: messages.length > 0,
    body: req.body
  });
});
authRouter.post(
  "/login",
  function (req, res, next) {
    var messages = req.flash("error");
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
      var messages = [];
      errors.forEach(function (error) {
        messages.push(error.msg);
      });
      res.render("login/login", {
        messages: messages,
        hasErrors: messages.length > 0,
      });
    } else {
      next();
    }
  },
  passport.authenticate("local.signin", {
    successRedirect: "/feeds",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);
authRouter.get("/signup", (req, res) => {
  var messages = req.flash("error");
  res.render("signup/signup", {
    messages: messages,
    hasErrors: messages.length > 0,
  });
});
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
    check("password", "Your password must be from 8 to 64 characters").isLength({
      min: 8,
      max: 64,
    }),
  ],
  function (req, res, next) {
    var messages = req.flash("error");
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
      var messages = [];
      errors.forEach(function (error) {
        messages.push(error.msg);
      });
      res.render("signup/signup", {
        messages: messages,
        hasErrors: messages.length > 0,
        body: req.body
      });
    } else {
      next();
    }
  },
  passport.authenticate("local.signup", {
    successRedirect: "/auth/login",
    failureRedirect: "/auth/signup",
    failureFlash: true,
  })
);
export default authRouter;
