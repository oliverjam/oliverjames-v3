const head = require("../../utils/head");
const getReadingTime = require("../../utils/getReadingTime");

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
                ${date(data.date)}
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

const date = d => {
  const formattedDate = d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return html`
    <time datetime="${d.toISOString()}" title="${d}">${formattedDate}</time>
  `;
};

const readingTime = content => {
  const seconds = getReadingTime(content);

  return html`
    <time datetime="${seconds}s">${(seconds / 60).toFixed(1)} minute read</time>
  `;
};
