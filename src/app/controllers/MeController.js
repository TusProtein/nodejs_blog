import Product from '../models/Product.js';

class MeController {
    //[GET] /stored/products
    storedProducts(req, res, next) {
        Product.find({})
            .lean()
            .then((products) =>
                res.render('./me/stored-products', {
                    products,
                })
            )
            .catch(next);
    }
}

export default new MeController();
