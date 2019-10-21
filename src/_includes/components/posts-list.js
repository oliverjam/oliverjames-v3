const html = String.raw;

module.exports = ({ posts, tags = false }) => html`
  <ul class="posts">
    ${posts.reduceRight(
      (acc, post) =>
        acc +
        html`
          <li class="post">
            <a class="post__link" href=${post.url}
              >${post.data.title || post.fileSlug}</a
            >
            ${tags
              ? html`
                  <a
                    class="tag"
                    href="tags/${post.data.tags[1]}"
                    aria-label="all ${post.data.tags[1]} tags"
                    >${post.data.tags[1]}</a
                  >
                `
              : ""}
          </li>
        `,
      ""
    )}
  </ul>
`;
