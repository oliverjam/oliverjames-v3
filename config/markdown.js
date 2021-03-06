const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const slugify = require("@sindresorhus/slugify");

const permalinkSymbol = `<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15"></path></svg>`;

const md = markdownIt({
  html: true, // passthrough raw html in md files
  linkify: true, // auto-link URLs
  typographer: true, // smartquotes, other nicer symbols
});

md.use(markdownItAnchor, {
  slugify, // nicer url slugs
  permalink: true, // show link to headings
  permalinkSymbol, // nice svg link icon
  permalinkAttrs: (slug) => ({ "aria-label": `link to ${slug} section` }),
});

module.exports = md;
