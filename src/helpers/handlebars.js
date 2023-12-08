import Handlebars from 'handlebars';

const helpersHandlebars = {
  sum: (a, b) => a + b,
  ifVideoIdInvalid: function (videoId, options) {
    if (videoId && videoId.length === 11) {
      // options.fn(this) === true
      return options.fn(this);
    }
    // options.inverse(this) === false
    return options.inverse(this);
  },
  sortable: (column, dataSort) => {
    let sortType =
      column === dataSort.column && ['asc', 'desc'].includes(dataSort.type)
        ? dataSort.type
        : 'default';

    let icons = {
      default: 'fa-solid fa-sort',
      asc: 'fa-solid fa-arrow-down-short-wide',
      desc: 'fa-solid fa-arrow-down-wide-short',
    };

    let types = {
      default: 'desc',
      asc: 'desc',
      desc: 'asc',
    };

    let icon = icons[sortType];
    let type = types[sortType];

    const href = Handlebars.escapeExpression(
      `?_sort&column=${column}&type=${type}`,
    );

    const output = `<a href="${href}">
      <i class="${icon}"></i>
    </a>`;

    return new Handlebars.SafeString(output);
  },
};

export default helpersHandlebars;
