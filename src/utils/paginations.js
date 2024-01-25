const paginations = async (models, page, PAGE_SIZE = 4) => {
  try {
    if (page < 1) {
      page = 1;
    }

    const skipPage = (page - 1) * PAGE_SIZE;

    const [data, total] = await Promise.all([
      models.find({}).skip(skipPage).limit(PAGE_SIZE),
      models.countDocuments({}),
    ]);
    const totalPage = Math.ceil(total / PAGE_SIZE);
    return { data, total: totalPage };
  } catch (error) {
    console.log(error);
  }
};

export default paginations;
