const { displayDate, readingTime } = require("../../utils/dates");
const html = String.raw;

module.exports = ({ posts }) => html`
  <ul class="posts">
    ${posts.reduceRight(
      (acc, post) =>
        acc +
        html`
          <li class="post">
            <a class="post__link" href=${post.url}
              >${post.data.title || post.fileSlug}</a
            >
            <div class="post__info">
              ${displayDate(post.data.date)}
              <span aria-hidden="true">•</span>
              ${readingTime(post.templateContent)}
            </div>
          </li>
        `,
      ""
    )}
  </ul>
`;
