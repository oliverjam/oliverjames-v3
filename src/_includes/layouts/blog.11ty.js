const head = require("../../utils/head");
const { displayDate, readingTime } = require("../../utils/dates");

const html = String.raw;

module.exports = data => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${head()}
        <link rel="stylesheet" href="/assets/css/blog.css" />
        <link
          rel="stylesheet"
          href="/assets/css/prism-ateliersulphurpool.css"
        />
        <title>Oliver | Blog</title>
      </head>
      <body>
        <main>
          <header>
            <div class="header-container">
              <h1>${data.title}</h1>
              <div>
                ${displayDate(data.date)}
                <span aria-hidden="true">•</span>
                ${readingTime(data.content)}
              </div>
            </div>
          </header>
          ${data.content}
        </main>
      </body>
    </html>
  `;
};

