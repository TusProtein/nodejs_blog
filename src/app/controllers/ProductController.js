import Product from '../models/Product.js';
class ProductController {
  //[GET] /news
  show(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      // lean() ==> Mongoose Documents -> Object JavaScript
      .lean()
      .then(productDetail => {
        res.render('./products/show', { productDetail });
      })
      .catch(next);
  }

  //[GET] /create
  create(req, res, next) {
    res.render('./products/create');
  }

  //[POST] /store
  store(req, res, next) {
    const formData = req.body;

    formData.image =
      formData.videoId && formData.videoId.length === 11
        ? `http://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`
        : formData.cdnId && formData.cdnId.length === 1
        ? `https://file.hstatic.net/1000301274/file/${formData.cdnId}_grande.jpg`
        : '/img/default-image.jpeg';

    const product = new Product(formData);
    product
      .save()
      .then(() => res.redirect('/me/stored-products'))
      .catch(err => {});
  }

  //[GET] /products/:id/edit
  edit(req, res, next) {
    Product.findById({ _id: req.params.id })
      .lean()
      .then(productId => res.render('./products/edit', { productId }))
      .catch(next);
  }

  //[PUT] /products/:id
  update(req, res, next) {
    const formData = req.body;

    formData.image =
      formData.videoId && formData.videoId.length === 11
        ? `http://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`
        : formData.cdnId && formData.cdnId.length === 1
        ? `https://file.hstatic.net/1000301274/file/${formData.cdnId}_grande.jpg`
        : '/img/default-image.jpeg';

    Product.updateOne({ _id: req.params.id }, formData)
      .lean()
      .then(() => res.redirect('/me/stored-products'))
      .catch(next);
  }

  //[DELETE] /products/:id
  destroy(req, res, next) {
    Product.delete({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[DELETE] /products/:id/force
  forceDelete(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[PATCH] /products/:id/restore
  restore(req, res, next) {
    Product.restore({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

export default new ProductController();
