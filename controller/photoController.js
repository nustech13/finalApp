import { photoModel } from "../model/photoModel.js";
import Resize from "../resize.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const photoController = {
  add: async (req, res) => {
    try {
      if (!req.body.title) {
        res
          .status(201)
          .render("photos/addPhoto", {
            mess: "Please provide an title",
            error: "error",
            req: req.body
          });
      } else if (!req.file) {
        res
          .status(201)
          .render("photos/addPhoto", {
            mess: "Please provide an image",
            error: "error",
            req: req.body
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
        return res
          .status(200)
          .render("photos/addPhoto", { mess: "Add Successfully!!!", req: req.body });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const photos = await photoModel.find();
      res.status(200).render("photos/myPhotos", { photos: photos });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
