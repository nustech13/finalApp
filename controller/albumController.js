import { albumModel } from "../model/albumModel.js";
import Resize from "../resize.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const albumController = {
  add: async (req, res) => {
    try {
      if (req.body.title.length > 140) {
        res.status(201).render("photos/addPhoto", {
          mess: "Title maximum 140 characters long",
          error: "error",
          req: req.body,
        });
      } else if (req.body.description.length > 300) {
        res.status(201).render("photos/addPhoto", {
          mess: "Description maximum 300 characters long",
          error: "error",
          req: req.body,
        });
      } else if (req.files.length < 1) {
        res.status(201).render("albums/addAlbum", {
          mess: "Please provide an image",
          error: "error",
          req: req.body,
        });
      } else {
        const imagePath = path.join(__dirname, "../public/albums");
        const fileUpload = new Resize(imagePath);
        const images = [];
        for (let i = 0; i < req.files.length; i++) {
          images.push("albums/" + (await fileUpload.save(req.files[i].buffer)));
        }
        const newAlbum = await new albumModel({
          title: req.body.title,
          description: req.body.description,
          images: images,
          isPublic: req.body.isPublic,
        });
        newAlbum.save();
        return res.status(200).render("albums/addAlbum", {
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
    const pageSize = 20;
    const skipIndex = (page - 1) * pageSize;
    const result = {
      albums: [],
      numberOfResult: "",
      offset: "",
    };
    let pageActives = [];
    let preCheck = page === 1;
    try {
      if (!page) {
        return res.status(200).redirect("/albums?page=1");
      }
      result.albums = await albumModel.find();
      result.numberOfResult = result.albums.length;
      result.albums = await albumModel.find().limit(pageSize).skip(skipIndex);
      result.offset = skipIndex;
      const maxPage = Math.ceil(result.numberOfResult / pageSize);
      if (page > maxPage) {
        return res.status(200).redirect("/albums?page=1");
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
      } else if (page === 1 && maxPage === 1) {
        pageActives = [{ page: 1, active: "page-active" }];
      } else if (page === 2 && maxPage < 3) {
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
      return res.status(200).render("albums/myAlbums", {
        albums: result.albums,
        pageActives: pageActives,
        preCheck: preCheck,
        nextCheck: nextCheck,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
