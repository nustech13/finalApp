import routers from "../routers/router.js";

const routerConfig = (app) => {
  app.use("/feeds", routers.feedRouter);
  app.use("/photos", routers.photosRouter);
  app.use("/albums", routers.albumsRouter);
  app.use("/auth", routers.authRouter);
  app.use("/profile", routers.profileRouter);
};
export default routerConfig;
