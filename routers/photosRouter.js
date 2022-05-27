import express from "express";

const photosRouter = express.Router();
photosRouter.get("/", (request, response) => {
  const photos = [
    {
      id: "1",
      image: "https://ngheandata.com/wp-content/uploads/2022/01/anh-ho-dep.jpg",
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
    {
      id: "2",
      image: "https://bytuong.com/wp-content/uploads/2019/06/hinh-anh-hinh-nen-con-cao-dep-de-thuong-21.png",
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
    {
      id: "3",
      image: "https://trungtamtienghan.edu.vn/uploads/blog/2019_08/cach-noi-con-meo-trong-tieng-han.jpg",
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
    {
      id: "4",
      image: "https://icdn.dantri.com.vn/thumb_w/660/2021/06/09/chodocx-1623207689539.jpeg",
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
    {
      id: "5",
      image: "https://vansu.net/sites/default/files/pictures/08/2-con-ho-trang.png",
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
    {
      id: "6",
      image: "https://sogiacmo.com/administrator/webroot/upload/image/images/so-mo/mo-thay-con-tho.jpg",
      title: "Nam tempor posuere faucibus",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis at justo sit amet porttitor. Integer iaculis at justo sit amet porttitor.",
      user: {
        name: "Thuan Nguyen",
        image: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
      }
    },
  ]
  response.render("photos/myPhotos", {photos: photos});
});
photosRouter.get("/add", (request, response) => {

  response.render("photos/addPhoto"); 
})
export default photosRouter;
