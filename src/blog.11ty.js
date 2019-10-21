const PostsList = require("./_includes/components/posts-list");
const html = String.raw;

class Blog {
  data() {
    return {
      layout: "layouts/default.11ty.js",
      styles: ["tags", "posts"],
    };
  }
  render({ collections: { blog = [] } }) {
    return html`
      <h1>All posts</h1>
      <nav aria-label="categories"></nav>
      ${PostsList({ posts: blog })}
    `;
  }
}

module.exports = Blog;
