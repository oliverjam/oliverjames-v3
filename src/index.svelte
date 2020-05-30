<script context="module">
  export const data = {
    layout: "layouts/default.svelte",
    title: "Home",
  };
</script>

<script>
  import { formatDate, getRelativeTime } from "./utils/dates";
  export let data;
  const posts = data.collections.blog.slice(-3).reverse();
</script>

<svelte:head>
  {#each posts as post}
    <link rel="prefetch" href={post.url} />
  {/each}
</svelte:head>

<div class="layout">
  <div class="page-title">
    <header>
      <h1>{data.site.tagline}</h1>
    </header>
  </div>
  <section class="stack" style="--space: 1.5rem">
    <h2>Recent posts</h2>
    <ul class="switcher" style="--space: 1.5rem">
      {#each posts as { url, data, fileSlug, date }}
        <li class="stack" style="--space: 0.25rem">
          <h3>
            <a href={url}>{data.title || fileSlug}</a>
          </h3>
          <time datetime={date.toISOString()} title={formatDate(date)}>
            {getRelativeTime(date)}
          </time>
        </li>
      {/each}
    </ul>
  </section>
</div>

<style>
  .layout {
    height: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
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
      var(--primaryHighlight),
      var(--primaryHighlight) 6px,
      transparent 6px,
      transparent 12px,
      var(--primaryShadow) 12px,
      var(--primaryShadow) 18px,
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

  h1 {
    font-size: 1.5rem;
    line-height: 1;
  }

  h2 {
    display: grid;
    grid-template-rows: auto 0.25rem;
    grid-row-gap: 0.5rem;

    text-transform: uppercase;
    font-family: var(--sans-serif);
    font-weight: 500;
    font-size: 0.875rem;
    letter-spacing: 1px;
    color: var(--subtext);
  }

  h2::after {
    content: "";
    width: 3rem;
    background-color: var(--primaryHighlight);
  }

  h3 {
    font-size: 1.125rem;
  }

  @media (min-width: 40em) {
    h1 {
      font-size: 2.5rem;
    }
    h3 {
      font-size: 1.25rem;
    }
  }

  a {
    display: block;
    position: relative;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  time {
    font-size: 0.875rem;
    font-family: var(--sans-serif);
    color: var(--subtext);
  }
</style>
