const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const slugify = require("@sindresorhus/slugify");
const rss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
require("svelte/register");

const permalinkSymbol = `<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15"></path></svg>`;

const position = {
  false: "push",
  true: "unshift",
};

const renderPermalink = (slug, opts, state, idx) => {
  const space = () =>
    Object.assign(new state.Token("text", "", 0), { content: " " });

  const linkTokens = [
    Object.assign(new state.Token("link_open", "a", 1), {
      attrs: [
        ["class", opts.permalinkClass],
        ["href", opts.permalinkHref(slug, state)],
        ...Object.entries(opts.permalinkAttrs),
      ],
    }),
    Object.assign(new state.Token("html_block", "", 0), {
      content: opts.permalinkSymbol,
    }),
    new state.Token("link_close", "a", -1),
  ];

  // `push` or `unshift` according to position option.
  // Space is at the opposite side.
  if (opts.permalinkSpace) {
    linkTokens[position[!opts.permalinkBefore]](space());
  }
  state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens);
};

module.exports = (config) => {
  const md = markdownIt({
    html: true, // passthrough raw html in md files
    linkify: true, // auto-link URLs
    typographer: true, // smartquotes, other nicer symbols
  });

  md.use(markdownItAnchor, {
    slugify, // nicer url slugs
    permalink: true, // show link to headings
    permalinkSymbol, // nice svg link icon
    permalinkAttrs: { "aria-label": "link to heading" },
    renderPermalink,
  });

  config.setLibrary("md", md);

  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  config.addPlugin(rss);
  config.addPlugin(syntaxHighlight);

  config.addPassthroughCopy("src/assets/js");
  config.addPassthroughCopy("src/assets/media");
  config.addPassthroughCopy({ "src/assets/favicons": "/" });

  config.addFilter("markdown", (content) => md.render(`${content}`));

  // needed to merge tag from posts.json with post-specific tags
  config.setDataDeepMerge(true);

  config.addTemplateFormats("svelte");

  // const styleManager = new Map();
  const styleManager = new AssetManager();
  const getStyles = (url) => styleManager.get(url);
  config.addFilter("getSvelteCssForPage", getStyles);
  const headManager = new AssetManager();
  const getHead = (url) => headManager.get(url);
  config.addFilter("getSvelteHeadForPage", getHead);

  config.addExtension("svelte", {
    read: false,
    getData: true,
    getInstanceFromInputPath: (inputPath) => require(inputPath),
    compile: (str, inputPath) => (data) => {
      if (str) {
        // since `read: false` is set 11ty doesn't read file contents
        // so if str has a value, it's a permalink
        return typeof str === "function" ? str(data) : str;
      }
      const Component = require(inputPath).default;
      const { html, css, head } = Component.render({
        data,
        getStyles,
        getHead,
      });

      styleManager.set(data.page.url, css.code);
      headManager.set(data.page.url, head);
      return html;
    },
  });

  return {
    dir: {
      input: "src",
    },
  };
};

// assets stored in a Map with one entry per page URL
// each entry is a Set so we don't store duplicates
// e.g. Map {
//   "/" -> Set ["ul { display: flex; }"],
//   "/blog" -> Set ["ul { display: flex; }", "h2.svelte-123 { color: red; }"],
// }
// We need to persist styles in a Set otherwise the final default.svelte layout breaks styles
// Since it has no knowledge of any Svelte children it overrides past CSS for that URL with ""
// Need to append rather than replace
class AssetManager {
  constructor() {
    this.assets = new Map();
  }
  set(pageUrl, string) {
    if (this.assets.has(pageUrl)) {
      const existingPageStyles = this.assets.get(pageUrl);
      existingPageStyles.add(string);
    } else {
      this.assets.set(pageUrl, new Set([string]));
    }
  }
  get(pageUrl) {
    let output = "";
    const pageAssets = this.assets.get(pageUrl);
    for (let asset of pageAssets) {
      output += asset;
    }
    return output;
  }
}
