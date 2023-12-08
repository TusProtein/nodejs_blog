function sortMiddleWear(req, res, next) {
  res.locals.sort = {
    enable: false,
    type: 'default',
  };

  if (req.query.hasOwnProperty('_sort')) {
    Object.assign(res.locals.sort, {
      enable: true,
      type: req.query.type,
      column: req.query.column,
    });
  }

  next();
}

export default sortMiddleWear;
