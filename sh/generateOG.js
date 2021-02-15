const screenshot = require("./screenshot");
const blogSlugs = require("../_site/blogSlugs.json");
console.log(blogSlugs);
async function run() {
  if (blogSlugs) {
    blogSlugs.forEach((slug) => {
      if (slug) {
        try {
          screenshot(`http://localhost:8080${slug}`);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
}

run();
