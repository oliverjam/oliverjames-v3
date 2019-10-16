const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = config => {
  config.addPlugin(syntaxHighlight);
  config.addPassthroughCopy("src/assets");
  return {
    dir: {
      input: "src",
    },
  };
};
