const slug = require("@sindresorhus/slugify");
const html = String.raw;

module.exports = ({ tags }) => {
  return html`
    <ul class="cluster" style="justify-content: center;">
      ${tags
        .map(
          ([tag, matchingPosts]) =>
            html`
              <li>
                <a class="tag" href="/blog/tags/${slug(tag)}"
                  >${tag} ${matchingPosts.length}</a
                >
              </li>
            `
        )
        .join("\n")}
      <li><a class="tag" href="tags">All tags</a></li>
    </ul>
  `;
};
