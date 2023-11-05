import Product from '../models/Product.js';
class SiteController {
    //[GET] /news
    index(req, res, next) {
        Product.find({})
            // lean() ==> Mongoose Documents -> Object JavaScript
            .lean()
            .then((products) =>
                res.render('home', {
                    products,
                })
            )
            .catch(next);
    }

    //[GET] /:slug
    search(req, res) {
        res.render('search');
    }
}

export default new SiteController();
