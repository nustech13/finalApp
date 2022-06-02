import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { AlbumController } from "../controller/albumController.js";
const albumsRouter = express.Router();
albumsRouter.get("/", AlbumController.getAll);
albumsRouter.get("/new", (req, res) => {
  res.render("albums/addAlbum", { req: request.body });
});
albumsRouter.post("/", upload.array("image", 25), AlbumController.add);
albumsRouter.put("/:id", upload.array("image", 25), AlbumController.update);
albumsRouter.get("/edit/:id", AlbumController.getA);

export default albumsRouter;
