<script context="module">
  export const data = {
    layout: "layouts/default.svelte",
    title: "All posts",
  };
</script>

<script>
  import { getAllTags } from "./utils/tags";
  import PostsList from "./_includes/components/posts-list.svelte";
  import Tag from "./_includes/components/tag.svelte";

  export let collections;
  const allTags = getAllTags(collections);
  const tags = allTags.slice(0, 3);
  const posts = collections.blog
    .filter((post) => post.data.permalink !== false)
    .reverse();
</script>

<div class="stack">
  <h1>All posts</h1>
  <nav aria-label="categories" class="cluster">
    {#each tags as [tag, matchingPosts]}
      <Tag {tag} matches={matchingPosts.length} />
    {/each}
    <a href="tags">
      <strong>All tags</strong>
    </a>
  </nav>

  <PostsList {posts} />
</div>
