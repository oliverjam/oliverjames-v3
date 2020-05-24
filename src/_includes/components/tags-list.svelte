<script>
  import Tag from "./tag.svelte";

  export let tags;
</script>

<ul class="cluster" style="--space: 2rem; justify-content: center;">
  {#each tags as [tag, matchingPosts]}
    <li>
      <Tag {tag} matches={matchingPosts.length} />
    </li>
  {/each}
</ul>
