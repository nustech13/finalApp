import { PhotoModel } from "../model/photoModel.js";
import Resize from "../resize.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { paging } from "./albumController.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MAX_LENGTH_TITLE = 140;
const MAX_LENGTH_DESCRIPTION = 300;
export const handleError = (res, path, mess, body, bodyName) => {
  res.status(400).render(path, {
    mess: mess,
    error: "error",
    [bodyName]: body,
  });
};
export const PhotoController = {
  add: async (req, res) => {
    const { title, description, isPublic } = req.body;
    try {
      if (req.body.title.length > MAX_LENGTH_TITLE) {
        return handleError(
          res,
          "photos/addPhoto",
          "Title maximum 140 characters long",
          req.body,
          "photo"
        );
      }
      if (req.body.description.length > MAX_LENGTH_DESCRIPTION) {
        return handleError(
          res,
          "photos/addPhoto",
          "Description maximum 300 characters long",
          req.body,
          "photo"
        );
      }
      if (!req.file) {
        return handleError(
          res,
          "photos/addPhoto",
          "Please provide an image",
          req.body,
          "photo"
        );
      }
      const imagePath = path.join(__dirname, "../public/images");
      const fileUpload = new Resize(imagePath);
      const filename = await fileUpload.save(req.file.buffer);
      const newPhoto = await new PhotoModel({
        title: title,
        description: description,
        image: "images/" + filename,
        isPublic: isPublic,
      });
      newPhoto.save();
      return res.status(200).render("photos/addPhoto", {
        mess: "Add Successfully!!!",
        photo: req.body,
      });
    } catch (error) {
      return res.status(500).render("photos/addPhoto", {
        mess: error,
        req: req.body,
      });
    }
  },
  getAll: async (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = 20;
    const skipIndex = (page - 1) * pageSize;
    const result = {
      photos: [],
      numberOfResult: "",
    };
    try {
      if (!page) {
        return res.status(200).redirect("/photos?page=1");
      }
      result.photos = await PhotoModel.find();
      result.numberOfResult = result.photos.length;
      result.photos = await PhotoModel.find().limit(pageSize).skip(skipIndex);
      const maxPage = Math.ceil(result.numberOfResult / pageSize);
      if (page > maxPage) {
        return res.status(200).redirect("/photos?page=1");
      }
      let preCheck = page === 1;
      let nextCheck = page === maxPage;
      return res.status(200).render("photos/myPhotos", {
        photos: result.photos,
        pageActives: paging(page, maxPage),
        preCheck: preCheck,
        nextCheck: nextCheck,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getViewEdit: async (req, res) => {
    try {
      const photo = await PhotoModel.findById(req.params.id);
      return res.status(200).render("photos/editPhoto", {
        photo: photo,
        id: req.params.id,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const photo = await PhotoModel.findById(req.params.id);
      const { title, description, isPublic } = req.body;
      if (req.body.title.length > MAX_LENGTH_TITLE) {
        return handleError(
          res,
          "photos/editPhoto",
          "Title maximum 140 characters long",
          photo,
          "photo"
        );
      }
      if (req.body.description.length > MAX_LENGTH_DESCRIPTION) {
        return handleError(
          res,
          "photos/editPhoto",
          "Description maximum 300 characters long",
          photo,
          "photo"
        );
      }
      if (!req.file) {
        await photo.updateOne({ $set: req.body });
        return res.status(200).render("photos/editPhoto", {
          mess: "Update Successfully!!!",
          photo: await PhotoModel.findById(req.params.id),
        });
      }
      const imagePath = path.join(__dirname, "../public/images");
      const fileUpload = new Resize(imagePath);
      const filename = await fileUpload.save(req.file.buffer);
      fs.unlinkSync(`public/${photo.image}`);
      const photoUpdate = {
        title: title,
        description: description,
        isPublic: isPublic,
        image: "images/" + filename,
      };
      await photo.updateOne({ $set: photoUpdate });
      return res.status(200).render("photos/editPhoto", {
        mess: "Update Successfully!!!",
        photo: await PhotoModel.findById(req.params.id),
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      if (req.body.isDelete == "true") {
        const photo = await PhotoModel.findById(req.params.id);
        fs.unlinkSync(`public/${photo.image}`);
        await PhotoModel.findByIdAndDelete(req.params.id);
        return res.redirect("/photos");
      }
      return res.status(400).render("photos/editPhoto", {photo: await PhotoModel.findById(req.params.id)});
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
