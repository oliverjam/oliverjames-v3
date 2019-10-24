const slug = require("@sindresorhus/slugify");
const html = String.raw;
const css = String.raw;

const TagsList = ({ tags }) => {
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

const tagsStyles = css`
  .tag {
    display: block;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-family: var(--sans-serif);
    background-color: var(--bg-lc);
    padding: 0.25rem 0.75rem;
    color: var(--darker);
    text-decoration: none;
    transition: 0.2s background-color;
  }

  .tag:hover {
    background-color: var(--orange);
    text-decoration: underline;
  }
`;

module.exports = { TagsList, tagsStyles };
