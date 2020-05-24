<script context="module">
  export const data = {
    layout: "layouts/default.11ty.js",
    pagination: {
      data: "collections",
      size: 1,
      alias: "tag",
      filter: ["all", "blog", "allTags"],
    },
    permalink: (data) => `/blog/tags/${slug(data.tag)}/`,
    title: (data) => `${data.tag[0].toUpperCase()}${data.tag.slice(1)} posts`,
  };
</script>

<script>
  import slug from "@sindresorhus/slugify";
  import PostsList from "./_includes/components/posts-list.svelte";

  export let data;
  const posts = data.collections[data.tag];
</script>

<h1>Posts tagged with "{data.tag}"</h1>
<ul>
  <PostsList {posts} />
</ul>
