import { albumModel } from "../model/albumModel.js";
import Resize from "../resize.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const albumController = {
    add: async (req, res) => {
        try {
          if (!req.body.title) {
            res
              .status(201)
              .render("albums/addAlbum", {
                mess: "Please provide an title",
                error: "error",
                req: req.body
              });
          } else if (req.files.length < 1) {
            res
              .status(201)
              .render("albums/addAlbum", {
                mess: "Please provide an image",
                error: "error",
                req: req.body
              });
          } else {
            const imagePath = path.join(__dirname, "../public/albums");
            const fileUpload = new Resize(imagePath);
            const images=[];
            for (let i = 0; i < req.files.length; i++) {
              images.push("albums/" + await fileUpload.save(req.files[i].buffer));
            }
            const newAlbum = await new albumModel({
              title: req.body.title,
              description: req.body.description,
              images: images,
              isPublic: req.body.isPublic,
            });
            newAlbum.save();
            return res
              .status(200)
              .render("albums/addAlbum", { mess: "Add Successfully!!!", req: req.body });
          }
        } catch (error) {
          res.status(500).json(error);
        }
      },
      getAll: async (req, res) => {
        try {
          const albums = await albumModel.find();
          res.status(200).render("albums/myAlbums", { albums: albums });
        } catch (error) {
          res.status(500).json(error);
        }
      },
}