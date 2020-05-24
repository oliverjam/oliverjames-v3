<script>
  import slug from "@sindresorhus/slugify";

  export let tag, matches, size;
</script>

<style>
  a {
    --padding: 0.25rem 0.75rem;
    display: block;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-family: var(--sans-serif);
    background-color: var(--bg-lc);
    padding: var(--padding);
    color: var(--darker);
    text-decoration: none;
    transition: 0.2s background-color;
  }

  a:hover {
    background-color: var(--orange);
    text-decoration: underline;
  }
</style>

<a
  class="tag"
  style={size === 'small' ? '' : '--padding: 0.5rem 1rem;'}
  href="/blog/tags/{slug(tag)}">
  {tag} {matches}
</a>
