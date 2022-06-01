import express from "express";
import { photoController } from "../controller/photoController.js";
import upload from "../middleware/uploadMiddleware.js";
const photosRouter = express.Router();
photosRouter.get("/", photoController.getAll);
photosRouter.get("/add", (request, response) => {
  response.render("photos/addPhoto", { req: request.body });
});
photosRouter.post("/add", upload.single("image"), photoController.add);
photosRouter.put("/edit/:id", upload.single("image"), photoController.update);
photosRouter.get("/edit/:id", photoController.getA);
photosRouter.delete("/delete/:id", photoController.delete);
export default photosRouter;
