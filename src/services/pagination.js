module.exports = (current, total) => {
  const start = Math.max(1, current - 2);

  const stop = Math.min(start + 4, total);

  const range = (start, stop) => Array.from({ length: (1 + stop - start) }, (_, i) => start + i);

  const pagination = range(start, stop);

  if (total <= 5) {
    return pagination.map((page) => page === current ? `**${page}**` : `${page}`);
  };

  while (pagination.length < 5) {
    pagination.unshift(pagination[0] - 1);
  };

  if (pagination[0] !== 1) {
    pagination.unshift('...');
  };

  if (pagination[pagination.length - 1] < total) {
    pagination.push('...');
  };

  return pagination.map((page) => page === current ? `**${page}**` : `${page}`);
};
