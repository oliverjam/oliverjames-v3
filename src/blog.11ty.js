const getAllTags = require("./utils/tags");
const { PostsList, postsStyles } = require("./_includes/components/posts-list");
const { Tag, tagStyles } = require("./_includes/components/tag");

const html = String.raw;

exports.data = () => {
  return {
    layout: "layouts/default.11ty.js",
    styles: postsStyles + tagStyles,
  };
};

exports.render = data => {
  const allTags = getAllTags(data.collections);
  return html`
    <h1>All posts</h1>
    <nav
      aria-label="categories"
      class="cluster"
      style="justify-content: center;"
    >
      ${allTags
        .slice(0, 3)
        .map(([tag, matchingPosts]) =>
          Tag({ tag, matches: matchingPosts.length, size: "small" })
        )
        .join("")}
      <a href="tags" class="tag">All tags</a>
    </nav>
    ${PostsList({ posts: data.collections.blog })}
  `;
};
