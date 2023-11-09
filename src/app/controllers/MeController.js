import Product from '../models/Product.js';

class MeController {
    //[GET] /me/stored-products
    edit(req, res, next) {
        Product.find({})
            .lean()
            .then((products) =>
                res.render('./me/stored-products', { products })
            )
            .catch(next);
    }
}

export default new MeController();
