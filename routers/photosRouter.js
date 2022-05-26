import express from "express";

const photosRouter = express.Router();
photosRouter.get("/", (request, response) => {
  response.render("myPhotos");
});
export default photosRouter;
