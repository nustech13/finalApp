import { validationResult } from "express-validator";

export const AuthController = {
  getViewSignin: (req, res) => {
    if (!req.session.passport) {
      var messages = req.flash("error");
      return res.render("signin/signin", {
        messages: messages,
        hasErrors: messages.length > 0,
        body: req,
      });
    }else{
      res.redirect("/feeds");
    }
  },
  getViewSignup: (req, res) => {
    var messages = req.flash("error");
    return res.render("signup/signup", {
      messages: messages,
      hasErrors: messages.length > 0,
    });
  },
  logout: (req, res) => {
    if (req.session.passport) {
      req.logout(req.user, (err) => {
        if (err) return next(err);
        res.redirect("/auth/signin");
      });
    }
  },
  signup: (req, res, next) => {
    var messages = req.flash("error");
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
      var messages = [];
      errors.forEach((error) => {
        messages.push(error.msg);
      });
      return res.render("signup/signup", {
        messages: messages,
        hasErrors: messages.length > 0,
        body: req.body,
      });
    } else {
      next();
    }
  },
};
