<script context="module">
  export const data = {
    layout: "layouts/default.11ty.js",
  };
</script>

<script>
  import DisplayDate from "../components/display-date.svelte";
  import ReadingTime from "../components/reading-time.svelte";

  export let data;
  const { title, date, content } = data;
</script>

<header class="header">
  <div class="header-container">
    <h1>{title}</h1>
    <div>
      <DisplayDate {date} />
      <span aria-hidden="true">•</span>
      <ReadingTime {content} />
    </div>
  </div>
</header>

{@html content}

<div id="comments" class="webmentions" />

<svelte:head>
  <!--
    HACK ALERT: this CSS needs to be global for now
    since we're styling all the dynamic markdown content & syntax highlighting
    Injecting a style tag is easier than putting :global() around every selector
  -->
  <style>
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

    .header {
      grid-column: lg-breakout;
      margin-bottom: 2rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    .header-container {
      display: grid;
      justify-items: center;
      align-content: start;
      grid-row-gap: 1.5rem;
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

    main code,
    main kbd {
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      font-family: "Source Code Pro", Menlo, Monaco, Consolas, monospace;
      font-size: 80%;
      border-radius: 0.125rem;
      padding: 0.125rem 0.25rem;
      background-color: var(--bg-code);
    }

    main pre {
      grid-column: md-breakout / lg-breakout;
      padding: 1.5rem;
      background-color: var(--bg-code);
    }

    /* if browser supports subgrid inherit columns from main. this allows <code> to share the same gutter as the rest of the content */
    @supports (grid-template-columns: subgrid) {
      main pre {
        display: grid;
        grid-template-columns: subgrid;
        padding-left: 0;
        padding-right: 0;
      }
    }

    main pre > code {
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
      color: #5e6687;
      overflow: auto;
    }

    main img {
      grid-column: md-breakout / lg-breakout;
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

    .token.selector,
    .token.keyword {
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
    .token.control,
    .token.directive,
    .token.unit,
    .token.function {
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

    @media (prefers-color-scheme: dark) {
      main pre > code {
        color: hsl(220, 10%, 70%);
      }

      .token.comment,
      .token.punctuation,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: hsl(220, 40%, 68%);
      }

      .token.operator,
      .token.property,
      .token.attr-name {
        color: hsl(25, 70%, 60%);
      }

      .token.tag,
      .token.selector,
      .token.keyword {
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
      .token.control,
      .token.directive,
      .token.unit,
      .token.function {
        color: hsl(50, 60%, 60%);
      }
    }

    .webmentions {
      margin-top: 4rem;
      font-size: 0.875em;
    }

    .webmentions > * + * {
      margin-top: 2rem;
    }

    .avatar + .avatar {
      margin-left: -0.5rem;
    }

    .h-entry {
      margin-top: 2rem;
      display: flex;
    }

    .u-photo {
      width: 2rem;
      height: 2rem;
      flex: 0 0 auto;
      border-radius: 50%;
      object-fit: cover;
      background-color: var(--text-lc);
    }

    @media (min-width: 40em) {
      .u-photo {
        width: 2.75rem;
        height: 2.75rem;
      }
    }

    .mention-body {
      margin-left: 1rem;
    }

    .mention-meta {
      font-size: 0.75em;
    }

    .mention-meta a {
      font-family: var(--sans-serif);
      line-height: 1;
      text-decoration: none;
    }

    .mention-meta a:hover {
      text-decoration: underline;
    }

    .p-name {
      font-weight: bold;
    }

    .dt-published {
      color: var(--text-lc);
    }

    .e-content {
      margin-top: 0.25rem;
      line-height: 1.3;
    }

    .e-content a {
      text-decoration: underline;
      color: inherit;
    }
  </style>
  <script defer src="/assets/js/webmentions.js">

  </script>
</svelte:head>
