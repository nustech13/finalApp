import express from "express";

const albumsRouter = express.Router();
albumsRouter.get("/", (request, response) => {
  response.render("myAlbums");
});

export default albumsRouter;
