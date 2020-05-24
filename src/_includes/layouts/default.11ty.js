const CleanCSS = require("clean-css");
const Clean = new CleanCSS({});

const html = String.raw;
const css = String.raw;

module.exports = async function (data) {
  const {
    styles = "",
    content,
    head,
    title: pageTitle,
    description: pageDescription,
    page: { excerpt, fileSlug, url },
  } = data;
  if (!pageTitle) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `'${data.page.fileSlug}' should have a unique descriptive title`
    );
  }
  const title = `${
    typeof pageTitle === "function" ? pageTitle(data) : pageTitle
  } | Oliver Phillips - Frontend Engineer`;
  const description =
    pageDescription ||
    excerpt ||
    "Oliver Phillips is a frontend engineer designing and developing user interfaces in London, UK.";

  let css = globalStyles + styles;
  if (process.env.ELEVENTY_ENV) {
    const output = Clean.minify(css);
    if (output.warnings.length || output.errors.length) {
      console.warn(output.warnings);
      console.error(output.errors);
    }
    css = output.styles;
  }
  const svelteCss = this.getSvelteCssForPage(url);
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>${title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com/" />
        <link
          href="https://fonts.googleapis.com/css?family=Spectral:400,600|Source+Code+Pro:400&display=swap"
          rel="preload"
          as="style"
          onload="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css?family=Spectral:400,600|Source+Code+Pro:400&display=swap"
            rel="stylesheet"
          />
        </noscript>
        <style>
          ${css}
        </style>
        <style>
          ${svelteCss}
        </style>
        <meta name="description" content="${description}" />
        <meta property="og:title" content="${pageTitle}" />
        <meta property="og:description" content="${description.trim()}" />
        <meta
          property="og:image"
          content="https://oliverjam.es/assets/media/og-image/${fileSlug}.png"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@_oliverjam" />
        <meta
          name="keywords"
          content="blog, tech, developer, html, css, javascript, react"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffaa80" />
        <meta name="theme-color" content="#ffffff" />

        <link
          rel="alternative"
          type="application/atom+xml"
          href="/feed.xml"
          title="Oliver Phillips - Frontend Engineer"
        />

        <link
          rel="webmention"
          href="https://webmention.io/oliverjam.es/webmention"
        />
        <link rel="pingback" href="https://webmention.io/oliverjam.es/xmlrpc" />

        ${head ? head(data) : ""}
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
              aria-hidden="true"
            >
              <line
                x1="1"
                y1="3"
                x2="31"
                y2="3"
                stroke-width="4"
                stroke="var(--mid)"
              />
              <path
                d="M4 4 v26 h24 v-26"
                fill="none"
                stroke-linejoin="round"
                stroke="var(--mid)"
              />

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

              <line
                x1="11"
                y1="17"
                x2="21"
                y2="17"
                stroke="var(--blue)"
                stroke-width="4"
              />
            </svg>
          </a>
          <nav>
            <ul>
              <li>
                <a
                  href="${url === "/" ? "#main" : "/"}"
                  aria-current="${url === "/" ? "page" : "false"}"
                  >Home</a
                >
              </li>
              <li>
                <a
                  href="${url === "/blog/" ? "#main" : "/blog/"}"
                  aria-current="${url === "/blog/"
                    ? "page"
                    : url && url.includes("/blog/")
                    ? "true"
                    : "false"}"
                  >Blog</a
                >
              </li>
              <li>
                <a
                  href="${url === "/cv/" ? "#main" : "/cv/"}"
                  aria-current="${url === "/cv/" ? "page" : "false"}"
                  >CV</a
                >
              </li>
            </ul>
          </nav>
        </header>
        <main id="main">${content}</main>
        <footer class="site-footer">
          <div class="cluster" style="--space: 1.5rem;">
            <div>
              <h3>Social</h3>
              <ul class="social">
                <li>
                  <a href="https://twitter.com/_oliverjam" rel="me">Twitter</a>
                </li>
                <li>
                  <a href="https://github.com/oliverjam/" rel="me">Github</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/oliverjam">LinkedIn</a>
                </li>
              </ul>
            </div>

            <div>
              <h3>Contact</h3>
              <p>
                <a
                  href="mailto:hello@oliverjam.es"
                  title="hello@oliverjam.es"
                  rel="me"
                  >hello@oliverjam.es</a
                >
              </p>
            </div>
          </div>
        </footer>
        <img
          src="/.netlify/functions/counter"
          alt=""
          style="position:absolute"
        />
      </body>
    </html>
  `;
};

const globalStyles = css`
  * {
    margin: 0;
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration-line: underline;
  }

  a:focus {
    outline: 0.25rem solid var(--blue);
    outline-offset: 0.25rem;
  }

  img,
  video {
    max-width: 100%;
    height: auto;
  }

  ul[class],
  ol[class] {
    padding: 0;
    list-style: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    line-height: 1.1;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  :root {
    --light: hsl(220, 10%, 98%);
    --mid: hsl(220, 15%, 46%);
    --dark: hsl(220, 10%, 32%);
    --darker: hsl(220, 15%, 18%);
    --darkest: hsl(220, 15%, 12%);

    --bg-code: hsl(220, 10%, 95%);
    --text: var(--dark);
    --text-lc: var(--mid);
    --bg: var(--light);
    --bg-lc: hsl(220, 15%, 90%);
    --orange: hsl(20, 100%, 80%);
    --blue: hsl(220, 100%, 80%);
    --primary: hsl(20, 100%, 70%);

    --sans-serif: system-ui, -apple-system, BlinkMacSystemFont, Helvetica, Arial,
      sans-serif;
    --serif: "Spectral", Palatino, Palatino Linotype, Palatino LT STD,
      Book Antiqua, Georgia, serif;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --text: hsl(220, 10%, 90%);
      --text-lc: hsl(220, 20%, 75%);
      --bg: hsl(220, 15%, 22%);
      --bg-code: var(--darker);
      --bg-lc: hsl(220, 15%, 75%);
    }

    img {
      filter: brightness(0.9);
    }
  }

  html {
    font-size: 1.125rem;
    scroll-behavior: smooth;
  }

  @media (min-width: 40em) {
    html {
      font-size: 1.25rem;
    }
  }

  body {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: "header" "main" "footer";
    grid-row-gap: 2rem;
    font-family: var(--serif);
    line-height: 1.5;
    text-rendering: optimizelegibility;
    color: var(--text);
    background-color: var(--bg);
  }

  .switcher {
    --space: 1rem;
    --measure: 40rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: calc((var(--space) / 2) * -1);
  }

  .switcher > * {
    flex-grow: 1;
    flex-basis: calc((var(--measure) - (100% - var(--space))) * 999);
    margin: calc(var(--space) / 2);
  }

  .cluster {
    --space: 1rem;
    overflow: hidden;
  }

  .cluster {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin: calc(var(--space) / 2 * -1);
  }

  .cluster > * {
    margin: calc(var(--space) / 2);
  }

  .with-icon {
    display: inline-flex;
    align-items: center;
  }

  .with-icon svg {
    --space: 0.5em;
    width: 1em;
    height: 1em;
    width: 1cap;
    height: 1cap;
    margin-inline-end: var(--space);
  }

  .site-header {
    grid-area: header;
    display: flex;
    align-items: center;
    padding: calc(1rem + 1vw);
    font-size: 0.875rem;
  }

  .home-link svg {
    display: block;
  }

  .site-header nav {
    margin-left: auto;
  }

  .site-header ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }

  .site-header li + li {
    margin-left: 1rem;
  }

  .site-header a {
    text-decoration-thickness: 0.125rem;
    text-underline-offset: 0.25rem;
  }

  .site-header a[aria-current="page"],
  .site-header a[aria-current="true"] {
    text-decoration-line: underline;
    text-decoration-color: var(--primary);
  }

  main {
    grid-area: main;
    justify-self: center;
    padding: 1.5rem;
    text-align: center;
  }

  @supports (display: grid) {
    main {
      display: grid;
      grid-template-columns:
        minmax(1.5rem, 1fr)
        minmax(0, 56rem)
        minmax(1.5rem, 1fr);
      align-content: start;
      grid-row-gap: 3rem;
      padding: 0;
    }
  }

  main > * {
    grid-column: 2 / 3;
  }

  .site-footer {
    grid-area: footer;
    padding: 1rem 2rem;
    font-size: 0.875rem;
  }

  .site-footer .cluster {
    justify-content: flex-end;
    text-align: right;
  }

  .site-footer h3 {
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: var(--sans-serif);
    color: var(--text-lc);
  }

  .site-footer a {
    text-decoration: none;
  }

  .site-footer a:hover {
    text-decoration: underline;
  }

  .social {
    display: flex;
  }

  .social li + li::before {
    content: "/";
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    color: var(--text-lc);
  }
`;
