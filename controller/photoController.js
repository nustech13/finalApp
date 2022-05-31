import { photoModel } from "../model/photoModel.js";
import Resize from "../resize.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const photoController = {
  add: async (req, res) => {
    try {
      if (!req.body.title) {
        res.status(201).render("photos/addPhoto", {
          mess: "Please provide an title",
          error: "error",
          req: req.body,
        });
      } else if (!req.file) {
        res.status(201).render("photos/addPhoto", {
          mess: "Please provide an image",
          error: "error",
          req: req.body,
        });
      } else {
        const imagePath = path.join(__dirname, "../public/images");
        const fileUpload = new Resize(imagePath);
        const filename = await fileUpload.save(req.file.buffer);
        const newPhoto = await new photoModel({
          title: req.body.title,
          description: req.body.description,
          image: "images/" + filename,
          isPublic: req.body.isPublic,
        });
        newPhoto.save();
        return res.status(200).render("photos/addPhoto", {
          mess: "Add Successfully!!!",
          req: req.body,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = 1;
    const skipIndex = (page - 1) * pageSize;
    const result = {
      photos: [],
      numberOfResult: "",
      offset: "",
    };
    let pageActives = [];
    let preCheck = page === 1;
    try {
      if(!page){
        return res.status(200).redirect("/photos?page=1");
      }
      result.photos = await photoModel.find();
      result.numberOfResult = result.photos.length;
      result.photos = await photoModel.find().limit(pageSize).skip(skipIndex);
      result.offset = skipIndex;
      const maxPage = Math.ceil(result.numberOfResult / pageSize);
      if(page > maxPage){
        return res.status(200).redirect("/photos?page=1");
      }
      let nextCheck = page === maxPage;
      if (page === 1 && maxPage > 2) {
        pageActives = [
          { page: 1, active: "page-active" },
          { page: 2, active: "" },
          { page: 3, active: "" },
        ];
      } else if (page === 1 && maxPage === 2) {
        pageActives = [
          { page: 1, active: "page-active" },
          { page: 2, active: "" },
        ];
      }
      else if (page === 1 && maxPage === 1) {
        pageActives = [
          { page: 1, active: "page-active" },
        ];
      }
      else if (page === 2 && maxPage < 3) {
        pageActives = [
          { page: 1, active: "" },
          { page: 2, active: "page-active" },
        ];
      } else if (page > 1 && page < maxPage) {
        pageActives = [
          { page: page - 1, active: "" },
          { page: page, active: "page-active" },
          { page: page + 1, active: "" },
        ];
      } else {
        pageActives = [
          { page: maxPage - 2, active: "" },
          { page: maxPage - 1, active: "" },
          { page: maxPage, active: "page-active" },
        ];
      }
      return res
        .status(200)
        .render("photos/myPhotos", {
          photos: result.photos,
          pageActives: pageActives,
          preCheck: preCheck,
          nextCheck: nextCheck,
        })
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getA: async (req, res) => {
    try {
      const photo = await photoModel.findById(req.params.id);
      return res.status(200).render("photos/editPhoto", {
        photo: photo,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const photo = await photoModel.findById(req.params.id);
      fs.unlinkSync(`public/${photo.image}`);
      await photoModel.findByIdAndDelete(req.params.id);
      return res.redirect("/photos");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
