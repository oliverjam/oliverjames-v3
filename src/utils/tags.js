function getAllTags(collections) {
  return [...Object.entries(collections)]
    .filter(([key]) => !["all", "blog"].includes(key))
    .sort((a, b) => {
      return b[1].length - a[1].length;
    });
}

module.exports = getAllTags;
