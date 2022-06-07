import { AlbumModel } from '../model/AlbumModel.js';
import { PhotoModel } from '../model/PhotoModel.js';
import { paging } from './AlbumController.js';
import dateFormat from 'dateformat';
const PAGE_SIZE = 6;
const START_PAGE = 1;
export const FeedController = {
  getAllPhoto: async (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = PAGE_SIZE;
    const skipIndex = (page - 1) * pageSize;
    const result = {
      photos: [],
      numberOfResult: "",
    };
    try {
      if (!page) {
        return res.status(200).redirect("/feeds/photos?page=1");
      }
      result.photos = await PhotoModel.find({ isPublic: true });
      if(result.photos.length < 1){
        return res.status(400).render("feeds/feeds", {
          pageActives: [],
          preCheck: true,
          nextCheck: true,
          user: req.user
        });
      }
      result.numberOfResult = result.photos.length;
      result.photos = await PhotoModel.find({ isPublic: true }).populate("user")
        .sort({ createdAt: 1 })
        .limit(pageSize)
        .skip(skipIndex);
      for (const photo of result.photos) {
        photo.day = dateFormat(photo.createdAt, "h:MM tt dd/mm/yyyy");
      }
      const maxPage = Math.ceil(result.numberOfResult / pageSize);
      if (page > maxPage) {
        return res.status(200).redirect("/feeds/photos?page=1");
      }
      let preCheck = page === START_PAGE;
      let nextCheck = page === maxPage;
        return res.status(200).render("feeds/feeds", {
          photos: result.photos.reverse(),
          pageActives: paging(page, maxPage),
          preCheck: preCheck,
          nextCheck: nextCheck,
          user: req.user,
        });
      
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllAlbum: async (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = PAGE_SIZE;
    const skipIndex = (page - 1) * pageSize;
    const result = {
      albums: [],
      numberOfResult: "",
    };
    try {
      if (!page) {
        return res.status(200).redirect("/feeds/albums?page=1");
      }
      result.albums = await AlbumModel.find({ isPublic: true });
      if(result.albums.length < 1){
        return res.status(400).render("feeds/feeds", {
          pageActives: [],
          preCheck: true,
          nextCheck: true,
          user: req.user
        });
      }
      result.numberOfResult = result.albums.length;
      result.albums = await AlbumModel.find({ isPublic: true }).populate("user")
        .limit(pageSize)
        .skip(skipIndex);
      for (const album of result.albums) {
        album.day = dateFormat(album.createdAt, "h:MM tt dd/mm/yyyy");
      }
      const maxPage = Math.ceil(result.numberOfResult / pageSize);
      if (page > maxPage) {
        return res.status(200).redirect("/feeds/albums?page=1");
      }
      let preCheck = page === START_PAGE;
      let nextCheck = page === maxPage;
      return res.status(200).render("feeds/feeds", {
        albums: result.albums,
        pageActives: paging(page, maxPage),
        preCheck: preCheck,
        nextCheck: nextCheck,
        checkAlbum: true,
        user: req.user
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
