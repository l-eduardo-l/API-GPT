import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as url from 'url';
import path from 'path';
import session from 'express-session'

import indexRoutes from './routes/indexRoutes.js' // importa rotas de usuario


dotenv.config();


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(bodyParser.json({ extended: true }));
    this.app.use(express.urlencoded({ extend: true }));
    this.app.use(express.json());
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname,'./views'));
    this.app.use( session({
        secret : 'asdcfbhjkljkdlhkahjklwdhjklidwwakhjlawdhjkblwdaghijklawdGIYHOJ',
        name : 'session',
      })
    );
  }

  routes() {
    this.app.use('/', indexRoutes);
  }
}

export default new App().app;