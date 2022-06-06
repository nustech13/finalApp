import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { AlbumController } from "../controller/AlbumController.js";
const albumsRouter = express.Router();
albumsRouter.use("*", (req, res, next)=>{
  if (!req.session.passport) {
    res.redirect("/auth/signin");
  }else{
    next();
  }
})
albumsRouter.get("/", AlbumController.getAll);
albumsRouter.get("/new", (req, res) => {
  res.render("albums/addAlbum", { album: req.body, user: req.user });
});
albumsRouter.post("/", upload.array("image", 25), AlbumController.add);
albumsRouter.put("/:id", upload.array("image", 25), AlbumController.update);
albumsRouter.get("/edit/:id", AlbumController.getViewEdit);
albumsRouter.delete("/:id", AlbumController.delete);
export default albumsRouter;
