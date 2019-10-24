const getAllTags = require("./utils/tags");
const { PostsList, postsStyles } = require("./_includes/components/posts-list");
const { TagsList, tagsStyles } = require("./_includes/components/tags-list");

const html = String.raw;

class Blog {
  data() {
    return {
      layout: "layouts/default.11ty.js",
      styles: postsStyles + tagsStyles,
    };
  }
  render(data) {
    const allTags = getAllTags(data.collections);
    return html`
      <h1>All posts</h1>
      <nav aria-label="categories">
        ${TagsList({ tags: allTags.slice(0, 3) })}
      </nav>
      ${PostsList({ posts: data.collections.blog })}
    `;
  }
}

module.exports = Blog;
