<script>
  import slug from "@sindresorhus/slugify";

  export let tag, matches;
</script>

<a href="/blog/tags/{slug(tag)}">
  <strong>{tag}</strong>
  {matches}
</a>

<style>
  a {
    --padding: 0.5rem 1rem;
    display: block;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-family: var(--sans-serif);
    background-color: var(--bg-contrast);
    padding: var(--padding);
    text-decoration: none;
    transition: 0.2s background-color;
  }

  a:hover {
    background-color: var(--bg-highlight);
    text-decoration: underline;
  }
</style>
