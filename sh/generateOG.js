const screenshot = require("./screenshot");
const blogSlugs = require("../_site/blogSlugs.json");

async function run() {
  if (blogSlugs) {
    blogSlugs.forEach((slug) => {
      try {
        screenshot(`http://localhost:8080${slug}`);
      } catch (error) {
        console.error(error);
      }
    });
  }
}

run();
