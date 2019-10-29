const slug = require("@sindresorhus/slugify");
const { PostsList, postsStyles } = require("./_includes/components/posts-list");

const html = String.raw;

exports.data = () => {
  return {
    layout: "layouts/default.11ty.js",
    styles: postsStyles,
    pagination: {
      data: "collections",
      size: 1,
      alias: "tag",
      filter: ["all", "blog", "allTags"],
    },
    permalink: data => `/blog/tags/${slug(data.tag)}/`,
    title: data => `${data.tag[0].toUpperCase()}${data.tag.slice(1)} tag`,
  };
};

exports.render = data => {
  const posts = data.collections[data.tag];
  return html`
    <h1>Posts tagged with "${data.tag}"</h1>
    ${PostsList({ posts, tags: false })}
  `;
};
