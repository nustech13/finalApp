import express from "express";

const albumsRouter = express.Router();
albumsRouter.get("/", (request, response) => {
  const albums = [
    {
      id: "1",
      images: ["https://ngheandata.com/wp-content/uploads/2022/01/anh-ho-dep.jpg","https://ngheandata.com/wp-content/uploads/2022/01/anh-ho-dep.jpg"],
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
    {
      id: "2",
      images: ["https://bytuong.com/wp-content/uploads/2019/06/hinh-anh-hinh-nen-con-cao-dep-de-thuong-21.png"],
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
    {
      id: "3",
      images: ["https://trungtamtienghan.edu.vn/uploads/blog/2019_08/cach-noi-con-meo-trong-tieng-han.jpg"],
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
    {
      id: "4",
      images: ["https://icdn.dantri.com.vn/thumb_w/660/2021/06/09/chodocx-1623207689539.jpeg"],
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
    {
      id: "5",
      images: ["https://vansu.net/sites/default/files/pictures/08/2-con-ho-trang.png"],
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
    {
      id: "6",
      images: ["https://sogiacmo.com/administrator/webroot/upload/image/images/so-mo/mo-thay-con-tho.jpg", "https://sogiacmo.com/administrator/webroot/upload/image/images/so-mo/mo-thay-con-tho.jpg", "https://sogiacmo.com/administrator/webroot/upload/image/images/so-mo/mo-thay-con-tho.jpg", "https://sogiacmo.com/administrator/webroot/upload/image/images/so-mo/mo-thay-con-tho.jpg"],
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
  ]
  response.render("albums/myAlbums", {albums: albums});
});

albumsRouter.get("/add", (request, response) => {

  response.render("albums/addAlbum"); 
})
export default albumsRouter;
