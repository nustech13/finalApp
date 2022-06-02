import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import logger from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import routerConfig from "./config/routerConfig.js";
import mongoose from "mongoose";
import flash from "connect-flash";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import "./config/passport.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const URI = process.env.MONGODB_URL;
app.use(session({
  secret: 'adsa897adsa98bs',
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session());
app.use(flash());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(methodOverride("_method"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
routerConfig(app);
app.get('*', function(req, res){
  res.render("notFound404/notFound404");
});
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connect database success!");
    https: app.listen(port, () => {
      console.log(`Server is running at port ${port} !`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
