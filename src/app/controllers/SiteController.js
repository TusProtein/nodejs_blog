class SiteController {
    //[GET] /news
    index(req, res) {
        res.render("home");
    }
    //[GET] /:slug
    search(req, res) {
        res.render("search");
    }
}

export default new SiteController();
