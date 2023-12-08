class PrivateController {
  //[GET] /
  private(req, res, next) {
    res.render('./me/private', { username: res.username });
  }

  // //[GET] /student
  // privateInstructor(req, res, next) {
  //   res.render('./me/private', { username: res.username });
  // }

  // //[GET] /teacher
  // privateManager(req, res, next) {
  //   res.render('./me/private', { username: res.username });
  // }
}

export default new PrivateController();
