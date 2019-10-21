const html = String.raw;

class Blog {
  data() {
    return {
      layout: "layouts/default.11ty.js",
    };
  }
  render({ collections: { blog = [] } }) {
    return html`
      <h1>Blog posts</h1>
      <ul>
        ${blog.reduceRight(
          (acc, post) =>
            acc +
            html`
              <li>
                <a href=${post.url}>${post.data.title || post.fileSlug}</a>
              </li>
            `,
          ""
        )}
      </ul>
    `;
  }
}

module.exports = Blog;
