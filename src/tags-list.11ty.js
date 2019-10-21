const slug = require("@sindresorhus/slugify");
const html = String.raw;

class TagsList {
  data() {
    return {
      layout: "layouts/default.11ty.js",
      permalink: "/blog/tags/index.html",
    };
  }
  render(data) {
    const allTags = Object.keys(data.collections).filter(
      key => !["all", "blog"].includes(key)
    );
    return html`
      <h1>Tags</h1>
      <ul>
        ${allTags
          .map(
            tag =>
              html`
                  <li><a href="${slug(tag)}">${tag}</a></li>
              `
          )
          .join("\n")}
      </ul>
    `;
  }
}

module.exports = TagsList;
