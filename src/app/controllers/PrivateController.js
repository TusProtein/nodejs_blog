class PrivateController {
  //[GET] /task
  getAllTasks(req, res) {
    res.send('All tasks');
  }

  //[GET] /
  private(req, res, next) {
    res.render('./me/private', { username: res.username });
  }
}

export default new PrivateController();
