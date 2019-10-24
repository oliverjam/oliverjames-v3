const { readFileSync } = require("fs");
const html = String.raw;

module.exports = async ({ styles = [], content }) => {
  const css = ["global", ...styles].map(path =>
    readFileSync(process.cwd() + `/src/assets/css/${path}.css`, "utf-8")
  );
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
          <a href="/" aria-label="home" class="home-link">
          <svg
            viewBox="0 0 32 32"
            stroke="var(--primary)"
            stroke-width="2"
            width="44"
            height="44"
            aria-hidden="true">
              <line x1="1" y1="3" x2="31" y2="3" stroke-width="4" stroke="var(--mid)" />
              <path d="M4 4 v26 h24 v-26" fill="none" stroke-linejoin="round" stroke="var(--mid)" />

              <line x1="8" y1="7" x2="8" y2="13" />
              <line x1="8" y1="7" x2="8" y2="27" />
              <line x1="8" y1="21" x2="8" y2="27" />
              
              <line x1="12" y1="7" x2="12" y2="13" />
              <line x1="12" y1="21" x2="12" y2="27" />
              
              <line x1="16" y1="7" x2="16" y2="13" />
              <line x1="16" y1="21" x2="16" y2="27" />
              
              <line x1="20" y1="7" x2="20" y2="13" />
              <line x1="20" y1="21" x2="20" y2="27" />
              
              <line x1="24" y1="7" x2="24" y2="27" />

              <line x1="11" y1="17" x2="21" y2="17" stroke="var(--blue)" stroke-width="4" />
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
          <dl class="cluster" style="--space: 1.5rem;">
            <div>
              <dt>Social</dt>
              <div class="social">
                <dd><a href="https://twitter.com/_oliverjam">Twitter</a>
                </dd>
                <dd><a href="https://github.com/oliverjam/">Github</a>
                </dd>
                <dd><a href="https://www.linkedin.com/in/oliverjam">LinkedIn</a>
                </dd>
              </div>
            </div>
            
            <div>
              <dt>Contact</dt>
              <dd>
                <a href="mailto:hello@oliveram.es" title="hello@oliverjam.es"
                  >hello@oliverjam.es</a
                >
              </dd>
            </div>
          </ul>
        </footer>
      </body>
    </html>
  `;
};
