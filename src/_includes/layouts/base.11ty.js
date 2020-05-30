const html = String.raw;
const css = String.raw;

module.exports = async function (data) {
  const {
    site,
    content,
    title: pageTitle,
    description: pageDescription,
    page: { excerpt, fileSlug, url },
    theme,
  } = data;
  if (!pageTitle) {
    // eslint-disable-next-line no-console
    console.log("\x1b[31m%s\x1b[0m", `'${fileSlug}' needs a title`);
  }
  const title = `${pageTitle} | Oliver Phillips - Frontend Engineer`;
  const description = pageDescription || excerpt || site.description;

  const svelteCss = this.getSvelteCssForPage(url);
  const svelteHead = this.getSvelteHeadForPage(url);

  const fonts =
    "https://fonts.googleapis.com/css?family=Spectral:400,600|Source+Code+Pro:400&display=swap";
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>${title}</title>

        <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
        <link href="${fonts}" rel="preload" as="style" />
        <link
          href="${fonts}"
          rel="stylesheet"
          medi="print"
          onload="this.onload=null;this.media='all'"
        />
        <noscript>
          <link href="${fonts}" rel="stylesheet" />
        </noscript>

        <style>
          ${globalStyles(theme)}
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

        ${svelteHead}
      </head>
      <body>
        ${content}

        <img
          src="/.netlify/functions/counter"
          alt=""
          style="position:absolute"
        />
      </body>
    </html>
  `;
};

const globalStyles = (theme) => css`
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
    outline: 0.25rem solid var(--primaryShadow);
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
    --text: ${theme.day.text};
    --subtext: ${theme.day.textLowContrast};
    --bg: ${theme.day.bg};
    --bg-contrast: ${theme.day.bgContrast};
    --bg-highlight: ${theme.day.bgHighlight};
    --text-code: ${theme.night.text};
    --bg-code: ${theme.night.bgCode};

    --primaryHighlight: ${theme.day.primaryHighlight};
    --primaryShadow: ${theme.day.primaryShadow};
    --primary: ${theme.day.primary};

    --sans-serif: system-ui, -apple-system, BlinkMacSystemFont, Helvetica, Arial,
      sans-serif;
    --serif: "Spectral", Palatino, Palatino Linotype, Palatino LT STD,
      Book Antiqua, Georgia, serif;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --text: ${theme.night.text};
      --subtext: ${theme.night.textLowContrast};
      --bg: ${theme.night.bg};
      --bg-contrast: ${theme.night.bgContrast};
      --bg-highlight: ${theme.night.bgHighlight};

      --primaryHighlight: ${theme.night.primaryHighlight};
      --primaryShadow: ${theme.night.primaryShadow};
      --primary: ${theme.night.primary};
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
`;
