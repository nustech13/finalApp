import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import routerConfig from "./config/routerConfig.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const URL = process.env.MONGODB_URL;
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
routerConfig(app);
app.get('*', function(req, res){
  res.render("notFound404/notFound404");
});
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connect database success!");
    https: app.listen(port, () => {
      console.log(`Server is running at port ${port} !`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
