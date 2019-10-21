const html = String.raw;

class BlogNotFound {
  data() {
    return {
      layout: "layouts/default.11ty.js",
      permalink: "blog/tags/404.html",
    };
  }
  render() {
    return html`
      <h1>Post not found</h1>
    `;
  }
}

module.exports = BlogNotFound;
