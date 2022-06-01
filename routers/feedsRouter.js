import express from "express";
import { feedController } from "../controller/feedController.js";
const feedRouter = express.Router();
feedRouter.get("/", (req, res)=>{
    res.redirect("/feeds/photos");
});
feedRouter.get("/albums", feedController.getAllAlbum);
feedRouter.get("/photos", feedController.getAllPhoto);

export default feedRouter;
