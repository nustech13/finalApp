import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { albumController } from "../controller/albumController.js";
const albumsRouter = express.Router();
albumsRouter.get("/", albumController.getAll);
albumsRouter.get("/add", (request, response) => {
  response.render("albums/addAlbum", { req: request.body });
});
albumsRouter.post("/add", upload.array("image", 25), albumController.add);
albumsRouter.put("/edit/:id", upload.array("image", 25), albumController.update);
albumsRouter.get("/edit/:id", albumController.getA);

export default albumsRouter;
