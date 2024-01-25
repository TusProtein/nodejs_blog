import newsRouter from './news.js';
import meRouter from './me.js';
import productsRouter from './products.js';
import siteRouter from './site.js';
import loginRouter from './login.js';
import { checkLogin } from '../app/middlewares/authorizationMiddleWear.js';

function route(app) {
  app.use('/news', checkLogin, newsRouter);
  app.use('/me', checkLogin, meRouter);
  app.use('/products', checkLogin, productsRouter);

  app.use('/', siteRouter);
  app.use('/', loginRouter);
}

export default route;
