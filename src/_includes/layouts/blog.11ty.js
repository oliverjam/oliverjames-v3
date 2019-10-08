const html = String.raw;

module.exports = data => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="/css/prism-ateliersulphurpool.css" />
        <title>Oliver | Blog</title>
      </head>
      <body>
        ${data.content}
      </body>
    </html>
  `;
};
