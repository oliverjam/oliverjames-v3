const slug = require("@sindresorhus/slugify");
const html = String.raw;

class TagsList {
  data() {
    return {
      layout: "layouts/default.11ty.js",
      styles: ["tags"],
      permalink: "/blog/tags/index.html",
    };
  }
  render(data) {
    const allTags = [...Object.entries(data.collections)]
      .filter(([key]) => !["all", "blog"].includes(key))
      .sort((a, b) => {
        return b[1].length - a[1].length;
      });
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
              ([tag]) =>
                html`
                  <option>${slug(tag)}</option>
                `
            )
            .join("\n")}
        </datalist>
      </form>
      <section>
        <ul class="cluster">
          ${allTags
            .map(
              ([tag, matchingPosts]) =>
                html`
                  <li>
                    <a class="tag" href="${slug(tag)}"
                      >${tag} ${matchingPosts.length}</a
                    >
                  </li>
                `
            )
            .join("\n")}
        </ul>
      </section>
    `;
  }
}

module.exports = TagsList;
