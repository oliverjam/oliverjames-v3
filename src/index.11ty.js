const html = String.raw;

module.exports = data => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
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
