const slug = require("@sindresorhus/slugify");
const html = String.raw;
const css = String.raw;

const Tag = ({ tag, matches, size }) => {
  return html`
    <a
      class="tag"
      style="${size === "small" ? "" : "--padding: 0.5rem 1rem;"}"
      href="/blog/tags/${slug(tag)}"
      >${tag} ${matches}</a
    >
  `;
};

const tagStyles = css`
  .tag {
    --padding: 0.25rem 0.75rem;
    display: block;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-family: var(--sans-serif);
    background-color: var(--bg-lc);
    padding: var(--padding);
    color: var(--darker);
    text-decoration: none;
    transition: 0.2s background-color;
  }

  .tag:hover {
    background-color: var(--orange);
    text-decoration: underline;
  }
`;

module.exports = { Tag, tagStyles };
