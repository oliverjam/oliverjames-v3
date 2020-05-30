<script context="module">
  export const data = {
    layout: "layouts/base.svelte",
  };
</script>

<script>
  import DisplayDate from "../components/display-date.svelte";
  import ReadingTime from "../components/reading-time.svelte";

  export let data;
  const { title, date, content } = data;
</script>

<main id="main">

  <header class="header">
    <div>
      <h1>{title}</h1>
      <div>
        <DisplayDate {date} />
        <span aria-hidden="true">•</span>
        <ReadingTime {content} />
      </div>
    </div>
  </header>

  {@html data.content}

  <div id="comments" class="webmentions" />

</main>

<svelte:head>
  <script defer src="/assets/js/webmentions.js">

  </script>
</svelte:head>

<style>
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
      minmax(0, 4fr)
      [md-breakout-start]
      var(--content-gutter)
      [content-start]
      minmax(10rem, 60ch)
      [content-end]
      var(--content-gutter)
      [md-breakout-end]
      minmax(0, 4fr)
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

  /* all direct children default to middle column unless otherwise laid-out */
  main > :global(*) {
    grid-column: content;
  }

  header {
    grid-column: lg-breakout;
    margin-bottom: 2rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  header > div {
    display: grid;
    justify-items: center;
    align-content: start;
    grid-row-gap: 1.5rem;
    line-height: 1;
    text-align: center;
  }

  header > div::after {
    --triangle-height: 4rem;
    --stripe: var(--primaryHighlight);
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
      var(--primaryShadow) 12px,
      var(--primaryShadow) 18px,
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

  /* Global styles for dynamic markdown content */

  main :global(a) {
    --underline-color: var(--subtext);
    text-decoration-line: underline;
    text-decoration-skip-ink: skip;
    text-decoration-color: var(--underline-color);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.2rem;
    transition: text-decoration-color 0.25s;
  }

  main :global(a:hover) {
    --underline-color: var(--primary);
  }

  main :global(p) {
    line-height: 1.5;
  }

  main :global(h1),
  main :global(h2),
  main :global(h3),
  main :global(h4),
  main :global(h5),
  main :global(h6) {
    margin-top: 1em;
    font-family: "Spectral";
    font-weight: 600;
  }

  /* Don't double up on space for consecutive headings */
  main :global(h2 + h3),
  main :global(h3 + h4),
  main :global(h4 + h5),
  main :global(h5 + h6) {
    margin-top: 0;
  }

  main > :global(p:first-of-type::first-line) {
    font-weight: bold;
  }

  main > :global(blockquote) {
    padding-left: 2rem;
    position: relative;
  }

  main > :global(blockquote::before) {
    content: "“";
    position: absolute;
    font-size: 4rem;
    line-height: 1;
    left: 0;
  }

  main :global(ul),
  main :global(ol) {
    padding-left: 1.25rem;
    padding-inline-start: 1.25rem;
  }

  main :global(li) {
    line-height: 1.2;
  }

  main :global(li + li) {
    margin-top: 0.5rem;
  }

  main :global(code),
  main :global(kbd) {
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    font-family: "Source Code Pro", Menlo, Monaco, Consolas, monospace;
    font-size: 80%;
    border-radius: 0.125rem;
    padding: 0.125rem 0.25rem;
  }

  main :global(*:not(pre) > code),
  main :global(kbd) {
    background-color: var(--bg-contrast);
  }

  main :global(pre) {
    grid-column: md-breakout / lg-breakout;
    padding: 1.5rem;
    background-color: var(--bg-code);
    color: #f0fff4;
  }

  :global(.token.comment),
  :global(.token.punctuation),
  :global(.token.prolog),
  :global(.token.doctype),
  :global(.token.cdata) {
    color: hsl(100, 50%, 80%);
  }

  :global(.token.operator),
  :global(.token.property),
  :global(.token.attr-name) {
    color: hsl(110, 50%, 80%);
  }

  :global(.token.tag),
  :global(.token.selector),
  :global(.token.keyword) {
    color: hsl(140, 90%, 65%);
  }

  :global(.token.string),
  :global(.token.boolean),
  :global(.token.number),
  :global(.token.entity),
  :global(.token.url),
  :global(.token.statement),
  :global(.token.regex),
  :global(.token.atrule),
  :global(.language-css .token.string),
  :global(.style .token.string) {
    color: hsl(170, 70%, 80%);
  }

  :global(.token.attr-value),
  :global(.token.control),
  :global(.token.directive),
  :global(.token.unit),
  :global(.token.function) {
    color: hsl(80, 70%, 65%);
  }

  /* if browser supports subgrid inherit columns from main. this allows <code> to share the same gutter as the rest of the content */
  @supports (grid-template-columns: subgrid) {
    main :global(pre) {
      display: grid;
      grid-template-columns: subgrid;
      padding-left: 0;
      padding-right: 0;
    }
  }

  main :global(pre > code) {
    grid-column: content / lg-breakout;
    display: block;
    line-height: 1.375;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    -moz-tab-size: 4;
    tab-size: 4;
    hyphens: none;
    overflow: auto;
  }

  main :global(img) {
    grid-column: md-breakout / lg-breakout;
  }

  .webmentions {
    margin-top: 4rem;
    font-size: 0.875em;
  }

  .webmentions > :global(* + *) {
    margin-top: 2rem;
  }

  .webmentions :global(.avatar + .avatar) {
    margin-left: -0.5rem;
  }

  .webmentions :global(.h-entry) {
    margin-top: 2rem;
    display: flex;
  }

  .webmentions :global(.u-photo) {
    width: 2rem;
    height: 2rem;
    flex: 0 0 auto;
    border-radius: 50%;
    object-fit: cover;
    background-color: var(--subtext);
  }

  @media (min-width: 40em) {
    .webmentions :global(.u-photo) {
      width: 2.75rem;
      height: 2.75rem;
    }
  }

  .webmentions :global(.mention-body) {
    margin-left: 1rem;
  }

  .webmentions :global(.mention-meta) {
    font-size: 0.75em;
  }

  .webmentions :global(.mention-meta a) {
    font-family: var(--sans-serif);
    line-height: 1;
    text-decoration: none;
  }

  .webmentions :global(.mention-meta a:hover) {
    text-decoration: underline;
  }

  .webmentions :global(.p-name) {
    font-weight: bold;
  }

  .webmentions :global(.dt-published) {
    color: var(--subtext);
  }

  .webmentions :global(.e-content) {
    margin-top: 0.25rem;
    line-height: 1.3;
  }

  .webmentions :global(.e-content a) {
    text-decoration: underline;
    color: inherit;
  }
</style>
