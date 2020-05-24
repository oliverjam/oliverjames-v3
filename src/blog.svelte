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

  export let data;
  const allTags = getAllTags(data.collections);
  const tags = allTags.slice(0, 3);
  const posts = data.collections.blog;
</script>

<h1>All posts</h1>

<nav aria-label="categories" class="cluster" style="justify-content: center;">
  {#each tags as [tag, matchingPosts]}
    <Tag {tag} matches={matchingPosts.length} size="small" />
  {/each}
  <a href="tags" class="tag">All tags</a>
</nav>

<PostsList {posts} />
