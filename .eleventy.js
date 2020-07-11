const plugins = require("./config/plugins");
const md = require("./config/markdown");

module.exports = (config) => {
  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  config.setLibrary("md", md);

  Object.values(plugins).forEach((plugin) => config.addPlugin(plugin));

  config.addPassthroughCopy("src/assets/js");
  config.addPassthroughCopy("src/assets/media");
  config.addPassthroughCopy({ "src/assets/favicons": "/" });

  // needed to merge tag from blog.json with blog-specific tags
  config.setDataDeepMerge(true);

  return {
    dir: {
      input: "src",
    },
  };
};
