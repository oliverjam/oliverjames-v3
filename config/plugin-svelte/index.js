const path = require("path");
require("svelte/register");

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
  reset() {
    this.assets = new Map();
  }
}

function sveltePlugin(config) {
  const styleManager = new AssetManager();
  const getStyles = (url) => styleManager.get(url);

  const headManager = new AssetManager();
  const getHead = (url) => headManager.get(url);

  config.addFilter("getSvelteCssForPage", getStyles);
  config.addFilter("getSvelteHeadForPage", getHead);
  // runs on subsequent builds after initial
  // stops duplicate CSS piling up
  config.on("beforeWatch", () => {
    styleManager.reset();
    headManager.reset();
  });

  config.addTemplateFormats("svelte");
  config.addExtension("svelte", {
    read: false,
    getData: true,
    getInstanceFromInputPath: (inputPath) => {
      return require(path.join(process.cwd(), inputPath));
    },
    compile: (str, inputPath) => (data) => {
      if (str) {
        // since `read: false` is set 11ty doesn't read file contents
        // so if str has a value, it's a permalink
        return typeof str === "function" ? str(data) : str;
      }
      const Component = require(path.join(process.cwd(), inputPath)).default;
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
}

module.exports = sveltePlugin;
