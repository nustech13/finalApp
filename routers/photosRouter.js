import express from "express";
import { photoController } from "../controller/photoController.js";
import upload from '../middleware/uploadMiddleware.js'
const photosRouter = express.Router();
photosRouter.get("/", photoController.getAll);
photosRouter.get("/add", (request, response) => {

  response.render("photos/addPhoto", {req: request.body}); 
})
photosRouter.post("/add", upload.single('image') ,photoController.add);
export default photosRouter;
