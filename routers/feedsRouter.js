import express from "express";
import { FeedController } from "../controller/feedController.js";
const feedRouter = express.Router();
feedRouter.get("/", (req, res)=>{
    res.redirect("/feeds/photos");
});
feedRouter.get("/albums", FeedController.getAllAlbum);
feedRouter.get("/photos", FeedController.getAllPhoto);

export default feedRouter;
