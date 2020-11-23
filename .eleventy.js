const plugins = require("./config/plugins");
const md = require("./config/markdown");
const csv = require("csvtojson");

module.exports = (config) => {
  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  config.setLibrary("md", md);

  Object.values(plugins).forEach((plugin) => config.addPlugin(plugin));

  // tell 11ty to copy assets to the final build dir
  config.addPassthroughCopy({
    "src/assets/js": "assets/js",
    "src/assets/media": "assets/media",
    "src/assets/favicons": "/",
  });

  // needed to merge tag from blog.json with blog-specific tags
  config.setDataDeepMerge(true);

  config.addDataExtension("csv", (contents) => csv().fromString(contents));

  return {
    dir: {
      input: "src",
    },
  };
};
