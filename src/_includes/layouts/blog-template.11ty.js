const { displayDate, readingTime } = require("../../utils/dates");

const html = String.raw;
const css = String.raw;

exports.data = () => {
  return {
    layout: "layouts/default.11ty.js",
    styles,
  };
};

exports.render = data => {
  return html`
    <header class="blog-header">
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
  `;
};

const styles = css`
  p {
    line-height: 1.5;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1em;
    font-family: "Spectral";
    font-weight: 600;
  }

  /* Don't double up on space for consecutive headings */
  h2 + h3,
  h3 + h4,
  h4 + h5,
  h5 + h6 {
    margin-top: 0;
  }

  code {
    font-family: "Source Code Pro", Menlo, Monaco, Consolas, monospace;
    font-size: 0.875rem;
    border-radius: 0.125rem;
    padding: 0.125rem 0.25rem;
    background-color: var(--bg-code);
  }

  .grid {
    min-height: 100vh;
    display: grid;
  }

  main {
    --padding: 2rem;
    --page-gutter: minmax(0, 4fr);
    --content-gutter: minmax(1.5rem, 1fr);
    display: grid;
    grid-row-gap: 1.5em;
    padding-top: var(--padding);
    padding-bottom: var(--padding);
    grid-template-columns:
      [full-start]
      var(--page-gutter)
      [lg-breakout-start]
      minmax(0, 3fr)
      [md-breakout-start]
      var(--content-gutter)
      [content-start]
      minmax(10rem, 60ch)
      [content-end]
      var(--content-gutter)
      [md-breakout-end]
      minmax(0, 3fr)
      [lg-breakout-end]
      var(--page-gutter)
      [full-end];
    text-align: left;
  }

  @media (min-width: 50rem) {
    main {
      font-size: 1.25rem;
    }
  }

  main > * {
    grid-column: content;
  }

  main a {
    --underline-color: var(--text-lc);
    text-decoration-line: underline;
    text-decoration-skip-ink: skip;
    text-decoration-color: var(--underline-color);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.2rem;
    transition: text-decoration-color 0.25s;
  }

  main a:hover {
    --underline-color: var(--primary);
  }

  main p:first-of-type::first-line {
    font-weight: bold;
  }

  .blog-header {
    grid-column: content;
    position: relative;
  }

  @keyframes pop {
    to {
      transform: scale(1) rotate(45deg);
    }
  }

  .header-container {
    display: grid;
    justify-items: center;
    align-content: start;
    grid-row-gap: 1rem;
    line-height: 1;
    text-align: center;
  }

  .header-container::after {
    --triangle-height: 4rem;
    --stripe: var(--orange);
    grid-row: 3 / 4;
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    -webkit-clip-path: polygon(0 0, 50% 100%, 100% 0);
    content: "";
    width: calc(var(--triangle-height) * 2);
    height: var(--triangle-height);
    z-index: -10;
    background-image: repeating-linear-gradient(
      90deg,
      var(--stripe),
      var(--stripe) 6px,
      transparent 6px,
      transparent 12px,
      var(--blue) 12px,
      var(--blue) 18px,
      transparent 18px,
      transparent 24px
    );
  }

  h1 {
    margin: 0;
    font-weight: 900;
    font-size: calc(1em + 2.5vw);
    line-height: 1;
  }

  main ul,
  main ol {
    padding-left: 1.25rem;
    padding-inline-start: 1.25rem;
  }

  main li {
    line-height: 1.2;
  }

  main li + li {
    margin-top: 0.5rem;
  }

  pre {
    overflow-x: auto;
    padding: 1.5rem;
    background-color: var(--bg-code);
    grid-column: md-breakout / lg-breakout;
  }

  @supports (grid-template-columns: subgrid) {
    pre {
      padding-left: 0;
      padding-right: 0;
      display: grid;
      grid-template-columns: subgrid;
    }
  }

  pre > * {
    padding: 0;
    background-color: var(--bg-code);
  }

  @supports (grid-template-columns: subgrid) {
    pre > * {
      grid-column: content;
    }
  }

  img {
    margin-top: 1em;
    margin-bottom: 1em;
    grid-column: md-breakout / lg-breakout;
  }

  @media (min-width: 30em) {
    .blog-header {
      grid-column: lg-breakout;
      margin-bottom: 2rem;
    }
    pre {
      border-radius: 0.125rem;
      padding: 2rem;
    }
    img {
      border-radius: 0.125rem;
    }
  }

  code[class*="language-"],
  pre[class*="language-"] {
    line-height: 1.375;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    color: #5e6687;
  }

  pre[class*="language-"]::-moz-selection,
  pre[class*="language-"] ::-moz-selection,
  code[class*="language-"]::-moz-selection,
  code[class*="language-"] ::-moz-selection {
    text-shadow: none;
    background: #dfe2f1;
  }

  pre[class*="language-"]::selection,
  pre[class*="language-"] ::selection,
  code[class*="language-"]::selection,
  code[class*="language-"] ::selection {
    text-shadow: none;
    background: #dfe2f1;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #898ea4;
  }

  .token.punctuation {
    color: #5e6687;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.operator,
  .token.boolean,
  .token.number {
    color: #c76b29;
  }

  .token.property {
    color: #c08b30;
  }

  .token.tag {
    color: #3d8fd1;
  }

  .token.string {
    color: #22a2c9;
  }

  .token.selector {
    color: #6679cc;
  }

  .token.attr-name {
    color: #c76b29;
  }

  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #22a2c9;
  }

  .token.attr-value,
  .token.keyword,
  .token.control,
  .token.directive,
  .token.unit {
    color: #ac9739;
  }

  .token.statement,
  .token.regex,
  .token.atrule {
    color: #22a2c9;
  }

  .token.placeholder,
  .token.variable {
    color: #3d8fd1;
  }

  .token.deleted {
    text-decoration: line-through;
  }

  .token.inserted {
    border-bottom: 1px dotted #202746;
    text-decoration: none;
  }

  .token.italic {
    font-style: italic;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.important {
    color: #c94922;
  }

  .token.entity {
    cursor: help;
  }

  pre > code.highlight {
    outline: 0.4em solid #c94922;
    outline-offset: 0.4em;
  }

  /* overrides color-values for the Line Numbers plugin
 * http://prismjs.com/plugins/line-numbers/
 */
  .line-numbers .line-numbers-rows {
    border-right-color: #dfe2f1;
  }

  .line-numbers-rows > span:before {
    color: #979db4;
  }

  /* overrides color-values for the Line Highlight plugin
 * http://prismjs.com/plugins/line-highlight/
 */
  .line-highlight {
    background: rgba(107, 115, 148, 0.2);
    background: -webkit-linear-gradient(
      left,
      rgba(107, 115, 148, 0.2) 70%,
      rgba(107, 115, 148, 0)
    );
    background: linear-gradient(
      to right,
      rgba(107, 115, 148, 0.2) 70%,
      rgba(107, 115, 148, 0)
    );
  }

  @media (prefers-color-scheme: dark) {
    code[class*="language-"],
    pre[class*="language-"] {
      color: hsl(220, 10%, 70%);
    }

    pre[class*="language-"]::-moz-selection,
    pre[class*="language-"] ::-moz-selection,
    code[class*="language-"]::-moz-selection,
    code[class*="language-"] ::-moz-selection {
      text-shadow: none;
      background: #898ea4;
    }

    pre[class*="language-"]::selection,
    pre[class*="language-"] ::selection,
    code[class*="language-"]::selection,
    code[class*="language-"] ::selection {
      text-shadow: none;
      background: hsl(220, 20%, 50%);
    }

    /* Code blocks */
    pre[class*="language-"] {
      padding: 1em;
      margin: 0.5em 0;
      overflow: auto;
    }

    .token.comment,
    .token.punctuation,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: hsl(220, 40%, 68%);
    }

    .token.namespace {
      opacity: 0.7;
    }

    .token.operator,
    .token.property,
    .token.attr-name {
      color: hsl(25, 70%, 60%);
    }

    .token.tag,
    .token.selector {
      color: hsl(220, 100%, 75%);
    }

    .token.string,
    .token.boolean,
    .token.number,
    .token.entity,
    .token.url,
    .token.statement,
    .token.regex,
    .token.atrule,
    .language-css .token.string,
    .style .token.string {
      color: hsl(195, 70%, 50%);
    }

    .token.attr-value,
    .token.keyword,
    .token.control,
    .token.directive,
    .token.unit {
      color: hsl(50, 60%, 60%);
    }

    .token.placeholder,
    .token.variable {
      color: #3d8fd1;
    }

    .token.inserted {
      border-bottom: 1px dotted #f5f7ff;
      text-decoration: none;
    }

    .token.italic {
      font-style: italic;
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }

    .token.important {
      color: hsl(15, 70%, 50%);
    }

    pre > code.highlight {
      outline: 0.4em solid hsl(15, 70%, 50%);
      outline-offset: 0.4em;
    }

    .line-numbers .line-numbers-rows {
      border-right-color: #293256 !important;
    }

    .line-numbers-rows > span:before {
      color: #5e6687 !important;
    }

    .line-highlight {
      background: rgba(245, 247, 255, 0.2) !important;
      background: -webkit-linear-gradient(
        left,
        rgba(245, 247, 255, 0.2) 70%,
        rgba(245, 247, 255, 0)
      ) !important;
      background: linear-gradient(
        to right,
        rgba(245, 247, 255, 0.2) 70%,
        rgba(245, 247, 255, 0)
      ) !important;
    }
  }
`;
