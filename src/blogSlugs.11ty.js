exports.data = {
  permalink: "blogSlugs.json",
};

exports.render = (data) => {
  const slugs = data.collections.blog.map((page) => page.data.page.url);
  return JSON.stringify(slugs);
};
