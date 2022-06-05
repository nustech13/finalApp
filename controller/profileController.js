import { UserModel } from "../model/userModel.js";
import Resize from "../resize.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt-nodejs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AVATAR_DEFAULT = "avatars/avatar-default.png";
import fs from "fs";
const handleErrorPass = (user, res, messName, mess, error) =>{
  res.status(400).render("profile/profile", {
    user: user,
    error: error,
    [messName]: mess
  })
}
export const ProfileController = {
  changeInfor: async (req, res) => {
    const userUpdate = await UserModel.findById(req.user._id);
    if(req.body.firstName.length < 1 || req.body.firstName.length > 25){
      return handleErrorPass(req.user, res, "isSuccess", "First Name from 1 to 25 characters!", "error")
    }
    if(req.body.lastName.length < 1 || req.body.lastName.length > 25){
      return handleErrorPass(req.user, res, "isSuccess", "Last Name from 1 to 25 characters!", "error")
    }
    if (!req.file) {
      await userUpdate.updateOne({ $set: req.body });
      return res.status(200).render("profile/profile", {
        user: await UserModel.findById(req.user._id),
        isSuccess: "Update Infor Successfully!"
      })
    }
    if (req.body.imageOld !== AVATAR_DEFAULT) {
      fs.unlinkSync(`public/${req.body.imageOld}`);
    }
    const imagePath = path.join(__dirname, "../public/avatars");
    const fileUpload = new Resize(imagePath);
    const filename = await fileUpload.save(req.file.buffer);
    const newInfor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      image: "avatars/" + filename,
    };
    await userUpdate.updateOne({ $set: newInfor });
    return res.status(200).render("profile/profile", {
      user: await UserModel.findById(req.user._id),
      isSuccess: "Update Infor Successfully!"
    })
  },
  changePassword: async (req, res) => {
    const userUpdate = await UserModel.findById(req.user._id);
    if(!bcrypt.compareSync(req.body.curPass, userUpdate.password)){
      return handleErrorPass(req.user, res, "mess", "Current Password not match!", "error")
    }
    if(req.body.newPass.length < 6 || req.body.newPass.length > 64){
      return handleErrorPass(req.user, res, "mess", "New Password from 6 to 64 characters!", "error")
    }
    if(req.body.newPass !== req.body.conPass){
      return handleErrorPass(req.user, res, "mess", "Confirm Password not match!", "error")
    }
    await userUpdate.updateOne({password: bcrypt.hashSync(req.body.newPass, bcrypt.genSaltSync(5),null)});
    return handleErrorPass(await UserModel.findById(req.user._id), res, "mess", "Update Password Successfully!", "")
  },
};
