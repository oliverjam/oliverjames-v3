<script context="module">
  export const data = {
    layout: "layouts/default.11ty.js",
    title: "All tags",
    permalink: "/blog/tags/index.html"
  };
</script>

<script>
  import slug from "@sindresorhus/slugify";
  import { getAllTags } from "./utils/tags.js";
  import Tag from "./_includes/components/tag.svelte";

  export let data;
  const allTags = getAllTags(data.collections);
</script>

<h1>All tags</h1>
<form action="search">
  <label for="tag-filter">Filter tags</label>
  <input id="tag-filter" name="filter" list="all-tags" autocomplete="off" />
  <datalist id="all-tags">
    {#each allTags as [tag]}
      <option>{slug(tag)}</option>
    {/each}
  </datalist>
</form>
<section>
  <ul class="cluster" style="--space: 2rem; justify-content: center;">
    {#each allTags as [tag, matchingPosts]}
      <li>
        <Tag {tag} matches={matchingPosts.length} />
      </li>
    {/each}
  </ul>
</section>
