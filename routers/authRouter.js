import express from "express";

const authRouter = express.Router();
authRouter.get("/login", (request, response) => {
  response.render("login");
});
authRouter.get("/signup", (request, response) => {
  response.render("signup");
});
export default authRouter;
