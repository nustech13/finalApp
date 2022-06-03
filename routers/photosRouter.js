import express from "express";
import { PhotoController } from "../controller/photoController.js";
import upload from "../middleware/uploadMiddleware.js";
const photosRouter = express.Router();
photosRouter.get("/", PhotoController.getAll);
photosRouter.get("/new", (req, res) => {
  res.render("photos/addPhoto", { photo: req.body });
});
photosRouter.post("/", upload.single("image"), PhotoController.add);
photosRouter.put("/:id", upload.single("image"), PhotoController.update);
photosRouter.get("/edit/:id", PhotoController.getViewEdit);
photosRouter.delete("/:id", PhotoController.delete);
export default photosRouter;
