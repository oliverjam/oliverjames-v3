const html = String.raw;
const css = String.raw;

module.exports = async ({ styles, content }) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Oliver</title>
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
        ${globalStyles}
        ${styles ? styles : ""}
      </style>
      <meta
        name="description"
        content="Oliver Phillips is a frontend engineer based in London, UK."
      />
      <meta
        name="og:description"
        content="Oliver Phillips is a frontend engineer based in London, UK."
      />
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
            <li><a href="/blog">Blog</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>
      <main>${content}</main>
      <footer class="site-footer cluster" style="--space: 1.5rem;">
        <div>
          <h3>Social</h3>
          <ul class="social">
            <li><a href="https://twitter.com/_oliverjam">Twitter</a></li>
            <li><a href="https://github.com/oliverjam/">Github</a></li>
            <li>
              <a href="https://www.linkedin.com/in/oliverjam">LinkedIn</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <p>
            <a href="mailto:hello@oliveram.es" title="hello@oliverjam.es"
              >hello@oliverjam.es</a
            >
          </p>
        </div>
      </footer>
    </body>
  </html>
`;

const globalStyles = css`
  * {
    margin: 0;
    box-sizing: border-box;
  }

  a {
    color: inherit;
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
  }

  html {
    font-size: 1.125rem;
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

  .site-header {
    grid-area: header;
    display: flex;
    padding: 1rem;
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
        minmax(0, 50rem)
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
    justify-content: flex-end;
    text-align: right;
    padding: 1rem 2rem;
    font-size: 0.875rem;
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
