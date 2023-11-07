import Product from '../models/Product.js';
class ProductController {
    //[GET] /news
    show(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            // lean() ==> Mongoose Documents -> Object JavaScript
            .lean()
            .then((productDetail) =>
                res.render('./products/show', { productDetail })
            )
            .catch(next);
    }

    //[GET] /create
    create(req, res, next) {
        res.render('./products/create');
    }

    //[POST] /store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `http://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const product = new Product(formData);
        product
            .save()
            .then(() => res.redirect('/'))
            .catch((err) => {});
    }

    edit(req, res, next) {
        Product.findById({ _id: req.params.id })
            .lean()
            .then((productId) => res.render('./products/edit', { productId }))
            .catch(next);
    }

    update(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            // lean() ==> Mongoose Documents -> Object JavaScript
            .lean()
            .then(() => res.redirect('/me/stored-products'))
            .catch(next);
    }
}

export default new ProductController();
