const { readFile } = require("fs").promises;
const html = String.raw;

module.exports = async ({ styles = [], content }) => {
  const cssPromises = ["global", ...styles].map(path =>
    readFile(process.cwd() + `/src/assets/css/${path}.css`, "utf-8")
  );
  const css = await Promise.all(cssPromises);
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Oliver</title>
        <link
          href="https://fonts.googleapis.com/css?family=Spectral:400,600|Source+Code+Pro:400&display=swap"
          rel="stylesheet"
        />
        <style>
          ${css.join("\n")}
        </style>
      </head>
      <body>
        <header class="site-header">
          <a href="/" aria-label="home">
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              stroke="var(--darkest)"
              fill="var(--light)"
              width="48"
              height="48"
            >
              <path
                d="M4 2 v24 a3,1 0 0 0 24,0 v-24 z"
                stroke-width="2"
                style="fill:var(--orange)"
              />
              <path
                d="M4 6 a1,1 0 1 0 8,0 a1,1 0 1 0 8,0 a1,1 0 1 0 8,0"
                fill="currentcolor"
              />
              <path d="M3 2 h26 v3 h-26 z" fill="var(--darkest)" />
              <path
                d="M10 14 v8 a3,1 0 0 0 12,0 v-8 a8,1 0 0 1 -12,0"
                fill="currentcolor"
              />
            </svg>
          </a>
          <nav>
            <ul>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </nav>
        </header>
        <main>${content}</main>
        <footer class="site-footer">
          <ul>
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
        </footer>
      </body>
    </html>
  `;
};
