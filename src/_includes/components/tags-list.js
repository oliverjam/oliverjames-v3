const { Tag, tagStyles } = require("./tag");
const html = String.raw;

const TagsList = ({ tags }) => {
  return html`
    <ul class="cluster" style="--space: 2rem; justify-content: center;">
      ${tags
        .map(
          ([tag, matchingPosts]) =>
            html`
              <li>
                ${Tag({ tag, matches: matchingPosts.length })}
              </li>
            `
        )
        .join("\n")}
    </ul>
  `;
};

module.exports = { TagsList, tagsStyles: tagStyles };
