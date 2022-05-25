import express from "express";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.get('/home', (request, response) => {
    response.render('home');
  });
app.listen(port , () => {
    console.log(`server is running at port ${port}`);
});