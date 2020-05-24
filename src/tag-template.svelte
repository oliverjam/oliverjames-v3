<script context="module">
  export const data = {
    layout: "layouts/default.11ty.js",
    pagination: {
      data: "collections",
      size: 1,
      alias: "tag",
      filter: ["all", "blog", "allTags"]
    },
    permalink: data => `/blog/tags/${slug(data.tag)}/`,
    title: data => `${data.tag[0].toUpperCase()}${data.tag.slice(1)} posts`
  };
</script>

<script>
  import slug from "@sindresorhus/slugify";
  import DisplayDate from "./_includes/components/display-date.svelte";
  import ReadingTime from "./_includes/components/reading-time.svelte";
  import { displayDate, readingTime } from "./utils/dates";

  export let data;
  const posts = data.collections[data.tag];
</script>

<style>
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    grid-column-gap: 3rem;
    grid-row-gap: 3rem;
    font-size: 1.25rem;
  }

  li {
    display: grid;
    justify-items: center;
    grid-template-rows: auto auto 1fr;
    grid-row-gap: 0.5rem;
  }

  li::after {
    content: "";
    display: block;
    width: 6rem;
    margin-top: 1rem;
    align-self: end;
    border-bottom: 0.125rem solid var(--orange);
  }

  a {
    display: block;
    line-height: 1.2;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .post__info {
    font-size: 1rem;
    color: var(--text-lc);
  }
</style>

<h1>Posts tagged with "{data.tag}"</h1>
<ul>
  {#each posts as post}
    <li>
      <a href={post.url}>{post.data.title || post.fileSlug}</a>
      <div class="post__info">
        <DisplayDate date={post.data.date} />
        <span aria-hidden="true">•</span>
        <ReadingTime content={post.templateContent} />
      </div>
    </li>
  {/each}
</ul>
