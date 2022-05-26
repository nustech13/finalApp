import routers from "../routers/router.js";

const router_config = (app) =>{
    app.use('/feeds', routers.feedRouter);
    app.use('/photos', routers.photosRouter);
    app.use('/albums', routers.albumsRouter);
    app.use('/auth', routers.authRouter);
}
export default router_config;