import express from "express";

const authRouter = express.Router();
authRouter.get("/login", (request, response) => {
  response.render("login/login");
});
authRouter.get("/signup", (request, response) => {
  response.render("signup/signup");
});
export default authRouter;
