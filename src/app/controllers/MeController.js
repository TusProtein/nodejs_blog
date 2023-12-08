import Product from '../models/Product.js';

class MeController {
  //[GET] /me/stored-products
  storedProducts(req, res, next) {
    Promise.all([
      Product.find({}).sortable(req).lean(),
      Product.countDocumentsWithDeleted({ deleted: true }).lean(),
    ])
      .then(([products, deletedCount]) =>
        res.render('./me/stored-products', { products, deletedCount }),
      )
      .catch(next);
  }

  //[GET] /me/trash-products
  trashProducts(req, res, next) {
    Product.findWithDeleted({ deleted: true })
      .lean()
      .then(products => res.render('./me/trash-products', { products }))
      .catch(next);
  }
}

export default new MeController();
