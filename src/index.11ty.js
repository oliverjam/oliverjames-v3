const { relativeTime } = require("./utils/dates");

const html = String.raw;

class Home {
  data() {
    return {
      layout: "layouts/page.11ty.js",
      styles: ["home"],
    };
  }
  render(data) {
    return html`
      <div class="page-title">
        <header>
          <h1>I design and develop user experiences.</h1>
        </header>
      </div>
      <section class="section-blog">
        <h2>Recent posts</h2>
        <ul class="switcher" style="--space: 1.5rem">
          ${data.collections.blog.slice(-3).reduceRight(
            (acc, post) =>
              acc +
              html`
                <li class="blog-excerpt">
                  <h3>
                    <a href=${post.url}>${post.data.title || post.fileSlug}</a>
                  </h3>
                  ${relativeTime(post.date)}
                </li>
              `,
            ""
          )}
        </ul>
      </section>
    `;
  }
}

module.exports = Home;
