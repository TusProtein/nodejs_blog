import newsRouter from './news.js';
import productsRouter from './products.js';
import siteRouter from './site.js';

function route(app) {
    app.use('/news', newsRouter);
    app.use('/products', productsRouter);

    app.use('/', siteRouter);
}

export default route;
