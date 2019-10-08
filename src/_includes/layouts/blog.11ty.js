const html = String.raw;

module.exports = data => {
  console.log(data);
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="/css/blog.css" />
        <link rel="stylesheet" href="/css/prism-ateliersulphurpool.css" />
        <title>Oliver | Blog</title>
      </head>
      <body>
        <main>
          <header>
            <div class="header-container">
              <h1>${data.title}</h1>
              <div>${data.date}</div>
            </div>
          </header>
          ${data.content}
        </main>
      </body>
    </html>
  `;
};
