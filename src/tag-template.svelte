<script context="module">
  export const data = {
    layout: "layouts/default.svelte",
    pagination: {
      data: "collections",
      size: 1,
      alias: "tag",
      filter: ["all", "blog", "allTags"],
    },
    permalink: (data) => `/blog/tags/${slug(data.tag)}/`,
    eleventyComputed: {
      title: ({ tag }) => tag[0].toUpperCase() + tag.slice(1) + " posts",
    },
  };
</script>

<script>
  import slug from "@sindresorhus/slugify";
  import PostsList from "./_includes/components/posts-list.svelte";

  export let collections, tag;
  const posts = [...collections[tag]].reverse();
</script>

<div class="stack">
  <h1>Posts tagged with "{tag}"</h1>
  <PostsList {posts} />
</div>
