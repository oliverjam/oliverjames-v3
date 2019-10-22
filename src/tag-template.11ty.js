const slug = require("@sindresorhus/slugify");
const PostsList = require("./_includes/components/posts-list");
const html = String.raw;

class TagTemplate {
  data() {
    return {
      layout: "layouts/default.11ty.js",
      styles: ["posts"],
      pagination: {
        data: "collections",
        size: 1,
        alias: "tag",
        filter: ["all", "blog", "allTags"],
      },
      permalink: data => `/blog/tags/${slug(data.tag)}/`,
    };
  }
  render(data) {
    const posts = data.collections[data.tag];
    return html`
      <h1>Posts tagged with "${data.tag}"</h1>
      ${PostsList({ posts, tags: false })}
    `;
  }
}

module.exports = TagTemplate;
