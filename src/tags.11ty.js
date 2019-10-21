const slug = require("@sindresorhus/slugify");
const html = String.raw;

class TagsTemplate {
  data() {
    return {
      layout: "layouts/default.11ty.js",
      pagination: {
        data: "collections",
        size: 1,
        alias: "tag",
        filter: ["all", "blog"],
      },
      permalink: data => `/blog/tags/${slug(data.tag)}/`,
    };
  }
  render(data) {
    const postList = data.collections[data.tag];
    return html`
      <h1>${data.tag}</h1>
      <ul>
        ${postList
          .map(
            post =>
              html`
                <li><a href="${post.url}">${post.data.title}</a></li>
              `
          )
          .join("\n")}
      </ul>
    `;
  }
}

module.exports = TagsTemplate;
