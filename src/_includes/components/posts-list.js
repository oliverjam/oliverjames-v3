const { displayDate, readingTime } = require("../../utils/dates");
const html = String.raw;
const css = String.raw;

const PostsList = ({ posts }) => html`
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

const postsStyles = css`
  .posts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    font-size: 1.25rem;
  }

  .post {
    display: grid;
    justify-items: center;
    grid-template-rows: auto auto 1fr;
    grid-row-gap: 0.5rem;
  }

  .post::after {
    content: "";
    display: block;
    width: 6rem;
    margin-top: 1rem;
    align-self: end;
    border-bottom: 0.125rem solid var(--orange);
  }

  .post__link {
    display: block;
    line-height: 1.2;
    text-decoration: none;
  }

  .post__link:hover {
    text-decoration: underline;
  }

  .post__info {
    font-size: 1rem;
    color: var(--text-lc);
  }
`;

module.exports = { PostsList, postsStyles };
