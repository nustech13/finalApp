import express from 'express';
import { PhotoController } from '../controller/PhotoController.js';
import upload from '../middleware/UploadMiddleware.js';
const photosRouter = express.Router();
photosRouter.use("*", (req, res, next)=>{
  if (!req.session.passport) {
    res.redirect("/auth/signin");
  }else{
    next();
  }
})
photosRouter.get("/", PhotoController.getAll);
photosRouter.get("/new", (req, res) => {
  res.render("photos/addPhoto", { photo: req.body, user: req.user });
});
photosRouter.post("/", upload.single("image"), PhotoController.add);
photosRouter.put("/:id", upload.single("image"), PhotoController.update);
photosRouter.get("/edit/:id", PhotoController.getViewEdit);
photosRouter.delete("/:id", PhotoController.delete);
export default photosRouter;
