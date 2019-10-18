const html = String.raw;

class Blog {
  data() {
    return {
      layout: "layouts/default.11ty.js",
    };
  }
  render(data) {
    return html`
      <h1>Blog posts</h1>
      <ul>
        ${data.collections.blog.reduceRight(
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
