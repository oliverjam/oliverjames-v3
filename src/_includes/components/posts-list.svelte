<script>
  import DisplayDate from "./display-date.svelte";
  import ReadingTime from "./reading-time.svelte";

  export let posts;
</script>

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
    border-bottom: 0.125rem solid var(--primaryHighlight);
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
    color: var(--subtext);
  }
</style>
