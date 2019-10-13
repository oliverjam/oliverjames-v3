const head = require("./utils/head");
const html = String.raw;

module.exports = data => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${head()}
        <title>Oliver</title>
      </head>
      <body>
        ${data.collections.blog.reduce(
          (acc, post) =>
            acc +
            html`
              <a href=${post.url}>${post.data.title || post.fileSlug}</a>
            `,
          ""
        )}
      </body>
    </html>
  `;
};
