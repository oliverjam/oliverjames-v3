const { relativeTime } = require("./utils/dates");

const html = String.raw;

class Home {
  data() {
    return {
      layout: "layouts/page.11ty.js",
    };
  }
  render(data) {
    return html`
      <div class="page-title">
        <header>
          <h1>I design and develop user experiences.</h1>
        </header>
      </div>
      <ul style="display: grid; gap: 1rem;">
        ${data.collections.blog.slice(-3).reduceRight(
          (acc, post) =>
            acc +
            html`
              <li style="display: grid; gap: 0.5rem;">
                <a href=${post.url}>${post.data.title || post.fileSlug}</a>
                ${relativeTime(post.date)}
              </li>
            `,
          ""
        )}
      </ul>
    `;
  }
}

module.exports = Home;
