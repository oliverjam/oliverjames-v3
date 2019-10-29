const html = String.raw;

exports.data = () => {
  return {
    layout: "layouts/default.11ty.js",
    permalink: "blog/tags/404.html",
    title: "Page not found",
  };
};

exports.render = () => {
  return html`
    <h1>Post not found</h1>
  `;
};
