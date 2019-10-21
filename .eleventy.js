const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = config => {
  config.addPlugin(syntaxHighlight);
  config.addPassthroughCopy("src/assets");
  // needed to merge tag from posts.json with post-specific tags
  config.setDataDeepMerge(true);
  return {
    dir: {
      input: "src",
    },
  };
};
