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
        <link rel="stylesheet" href="/assets/css/global.css" />
        ${data.styles.reduce(
          (links, path) =>
            links + `<link rel="stylesheet" href="/assets/css/${path}.css" />`,
          ""
        )}
        <link
          href="https://fonts.googleapis.com/css?family=Spectral:400,600|Source+Code+Pro:400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header class="site-header">
          <div>O</div>
          <nav>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="https://twitter.com/_oliverjam">Twitter</a></li>
              <li><a href="https://github.com/oliverjam/">Github</a></li>
              <li>
                <a href="https://www.linkedin.com/in/oliverjam">LinkedIn</a>
              </li>
              <li>
                <a href="mailto:hello@oliveram.es" title="hello@oliveram.es"
                  >Email</a
                >
              </li>
            </ul>
          </nav>
        </header>
        <main>${data.content}</main>
        <footer class="site-footer">Footer</footer>
      </body>
    </html>
  `;
};
