const { relativeTime } = require("./utils/dates");

const html = String.raw;
const css = String.raw;

exports.data = () => {
  return {
    layout: "layouts/default.11ty.js",
    styles,
    title: "Home",
    head: ({ collections }) =>
      collections.blog
        .slice(-3)
        .map(
          post =>
            // prefetch first 3 blog posts so they load instantly
            html`
              <link rel="prefetch" href="${post.url}" />
            `
        )
        .join(""),
  };
};

exports.render = ({ collections: { blog = [] } }) => {
  return html`
    <div class="page-title">
      <header>
        <h1>I design and develop user experiences.</h1>
      </header>
    </div>
    <section class="section-blog">
      <h2>Recent posts</h2>
      <ul class="switcher" style="--space: 1.5rem">
        ${blog.slice(-3).reduceRight(
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
};

const styles = css`
  main {
    max-width: 60rem;
    margin: 2rem auto 4rem;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-row-gap: 2rem;
  }

  .page-title {
    display: grid;
    grid-row-gap: 1rem;
    align-items: center;
    justify-items: center;
    align-content: center;
    text-align: center;
    line-height: 1;
  }

  .page-title::after,
  .page-title::before {
    --triangle-height: 5rem;
    content: "";
    width: calc(var(--triangle-height) * 2);
    height: var(--triangle-height);
    background-image: repeating-linear-gradient(
      90deg,
      var(--orange),
      var(--orange) 6px,
      transparent 6px,
      transparent 12px,
      var(--blue) 12px,
      var(--blue) 18px,
      transparent 18px,
      transparent 24px
    );
  }

  .page-title::before {
    clip-path: polygon(0 100%, 50% 0, 100% 100%);
    -webkit-clip-path: polygon(0 100%, 50% 0, 100% 100%);
  }

  .page-title::after {
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    -webkit-clip-path: polygon(0 0, 50% 100%, 100% 0);
  }

  .page-title h1 {
    font-size: 1.5rem;
    line-height: 1;
  }

  .section-blog {
    display: grid;
    justify-items: center;
    grid-row-gap: 1rem;
  }

  .section-blog h2 {
    text-transform: uppercase;
    font-family: var(--sans-serif);
    font-weight: 500;
    font-size: 0.875rem;
    letter-spacing: 1px;
    text-align: center;
    color: var(--text-lc);
  }

  .section-blog h2::before,
  .section-blog h2::after {
    --width: 3rem;
    --height: 0.25rem;
    --padding: 0.5rem;
    content: "";
    display: block;
    position: relative;
    width: 3rem;
    height: var(--height);
    background-color: var(--orange);
    --v-offset: calc(50% - (var(--height) / 2));
  }

  .section-blog h2::before {
    top: var(--v-offset);
    left: calc((var(--width) + var(--padding)) * -1);
  }

  .section-blog h2::after {
    bottom: var(--v-offset);
    left: calc(100% + var(--padding));
  }

  .blog-excerpt {
    display: grid;
    gap: 0.25rem;
    text-align: center;
  }

  .blog-excerpt h3 {
    font-size: 1.125rem;
  }

  @media (min-width: 40em) {
    .page-title h1 {
      font-size: 2.5rem;
    }
    .blog-excerpt h3 {
      font-size: 1.25rem;
    }
  }

  .blog-excerpt a {
    display: block;
    position: relative;
    text-decoration: none;
  }

  .blog-excerpt a:hover {
    text-decoration: underline;
  }

  .blog-excerpt time {
    font-size: 0.875rem;
    font-family: var(--sans-serif);
    color: var(--text-lc);
  }
`;
