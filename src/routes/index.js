import newsRouter from './news.js';
import meRouter from './me.js';
import productsRouter from './products.js';
import siteRouter from './site.js';
import authorizationRouter from './authorization.js';
import loginRouter from './login.js';

function route(app) {
  app.use('/news', newsRouter);
  app.use('/me', meRouter);
  app.use('/products', productsRouter);
  app.use('/task', authorizationRouter);
  app.use('/login', loginRouter);

  app.use('/', siteRouter);
}

export default route;
