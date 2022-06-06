import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { ProfileController } from "../controller/ProfileController.js";
const profileRouter = express.Router();
profileRouter.use("*", (req, res, next) => {
  if (!req.session.passport) {
    res.redirect("/auth/signin");
  } else {
    next();
  }
});
profileRouter.get("/", (req, res) => {
  console.log(req.user);
  res.render("profile/profile", { user: req.user });
});
profileRouter.patch(
  "/infor",
  upload.single("image"),
  ProfileController.changeInfor
);
profileRouter.patch("/pass", ProfileController.changePassword);
export default profileRouter;
