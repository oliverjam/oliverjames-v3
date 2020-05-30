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

  export let data;
  const posts = [...data.collections[data.tag]].reverse();
</script>

<h1>Posts tagged with "{data.tag}"</h1>
<PostsList {posts} />
