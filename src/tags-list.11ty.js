const slug = require("@sindresorhus/slugify");
const html = String.raw;

class TagsList {
  data() {
    return {
      layout: "layouts/default.11ty.js",
      styles: ["tags-list"],
      permalink: "/blog/tags/index.html",
    };
  }
  render(data) {
    const allTags = Object.keys(data.collections).filter(
      key => !["all", "blog"].includes(key)
    );
    return html`
      <h1>Tags</h1>
      <form action="search">
        <label for="tag-filter">Filter tags</label>
        <input
          id="tag-filter"
          name="filter"
          list="all-tags"
          autocomplete="off"
        />
        <datalist id="all-tags">
          ${allTags
            .map(
              tag =>
                html`
                  <option>${slug(tag)}</option>
                `
            )
            .join("\n")}
        </datalist>
      </form>
      <section>
        <ul class="cluster tags">
          ${allTags
            .map(
              tag =>
                html`
                  <li><a href="${slug(tag)}">${tag}</a></li>
                `
            )
            .join("\n")}
        </ul>
      </section>
    `;
  }
}

module.exports = TagsList;
