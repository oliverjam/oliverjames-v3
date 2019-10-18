const { displayDate, readingTime } = require("../../utils/dates");

const html = String.raw;

class BlogPost {
  data() {
    return {
      layout: "layouts/default.11ty.js",
      styles: ["blog-post"],
    };
  }
  render(data) {
    return html`
      <header class="blog-header">
        <div class="header-container">
          <h1>${data.title}</h1>
          <div>
            ${displayDate(data.date)}
            <span aria-hidden="true">•</span>
            ${readingTime(data.content)}
          </div>
        </div>
      </header>
      ${data.content}
    `;
  }
}

module.exports = BlogPost;
