import express from "express";

const feedRouter = express.Router();
feedRouter.get("/", (request, response) => {
  response.render("feeds");
});

export default feedRouter;
