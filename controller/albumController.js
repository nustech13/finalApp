import { AlbumModel } from "../model/albumModel.js";
import Resize from "../resize.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const paging = (page, maxPage) => {
  let pageActives = [];
  if (page === 1 && maxPage > 2) {
    pageActives = [
      { page: 1, active: "page-active" },
      { page: 2, active: "" },
      { page: 3, active: "" },
    ];
  }
  if (page === 1 && maxPage === 2) {
    pageActives = [
      { page: 1, active: "page-active" },
      { page: 2, active: "" },
    ];
  }
  if (page === 1 && maxPage === 1) {
    pageActives = [{ page: 1, active: "page-active" }];
  }
  if (page === 2 && maxPage < 3) {
    return (pageActives = [
      { page: 1, active: "" },
      { page: 2, active: "page-active" },
    ]);
  }
  if (page > 1 && page < maxPage) {
    pageActives = [
      { page: page - 1, active: "" },
      { page: page, active: "page-active" },
      { page: page + 1, active: "" },
    ];
  }
  if (page > 2 && page === maxPage) {
    pageActives = [
      { page: maxPage - 2, active: "" },
      { page: maxPage - 1, active: "" },
      { page: maxPage, active: "page-active" },
    ];
  }
  return pageActives;
};
export const AlbumController = {
  add: async (req, res) => {
    try {
      if (req.body.title.length > 140) {
        res.status(400).render("photos/addPhoto", {
          mess: "Title maximum 140 characters long",
          error: "error",
          req: req.body,
        });
      } else if (req.body.description.length > 300) {
        res.status(400).render("photos/addPhoto", {
          mess: "Description maximum 300 characters long",
          error: "error",
          req: req.body,
        });
      } else if (req.files.length < 1) {
        res.status(400).render("albums/addAlbum", {
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
        const newAlbum = await new AlbumModel({
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
      res.status(400).json(error);
    }
  },
  getAll: async (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = 1;
    const skipIndex = (page - 1) * pageSize;
    const result = {
      albums: [],
      numberOfResult: "",
    };
    try {
      if (!page) {
        return res.status(200).redirect("/albums?page=1");
      }
      result.albums = await AlbumModel.find();
      result.numberOfResult = result.albums.length;
      result.albums = await AlbumModel.find().limit(pageSize).skip(skipIndex);
      const maxPage = Math.ceil(result.numberOfResult / pageSize);
      if (page > maxPage) {
        return res.status(200).redirect("/albums?page=1");
      }
      let preCheck = page === 1;
      let nextCheck = page === maxPage;
      return res.status(200).render("albums/myAlbums", {
        albums: result.albums,
        pageActives: paging(page, maxPage),
        preCheck: preCheck,
        nextCheck: nextCheck,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getA: async (req, res) => {
    try {
      const album = await AlbumModel.findById(req.params.id);
      return res.status(200).render("albums/editAlbum", {
        album: album,
        id: req.params.id,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const album = await AlbumModel.findById(req.params.id);
      if (req.body.title.length > 140) {
        res.status(400).render("albums/editAlbum", {
          mess: "Title maximum 140 characters long",
          error: "error",
          album: album,
        });
      } else if (req.body.description.length > 300) {
        res.status(400).render("albums/editAlbum", {
          mess: "Description maximum 300 characters long",
          error: "error",
          album: album,
        });
      } else if (!req.body.imageOld) {
        return res.status(400).render("albums/editAlbum", {
          mess: "Must have at least an image",
          error: "error",
          album: album,
        });
      } else if (!req.file) {
        if (req.body.imageOld == album.images) {
          await album.updateOne({ $set: req.body });
          return res.status(200).render("albums/editAlbum", {
            mess: "Update Successfully!!!",
            album: await AlbumModel.findById(req.params.id),
          });
        } else {
          for (const item of album.images) {
            if (!req.body.imageOld.includes(item)) {
              fs.unlinkSync(`public/${item}`);
            }
          }
          const albumUpdate = {
            title: req.title,
            description: req.description,
            isPublic: req.isPublic,
            images: req.body.imageOld,
          };
          await album.updateOne({ $set: albumUpdate });
          return res.status(200).render("albums/editAlbum", {
            mess: "Update Successfully!!!",
            album: await AlbumModel.findById(req.params.id),
          });
        }
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
