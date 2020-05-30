<script context="module">
  export const data = {
    layout: "layouts/base.svelte",
  };
</script>

<script>
  export let data;
</script>

<main id="main">
  {@html data.content}
</main>

<style>
  main {
    width: 100%;
    max-width: 60rem;
    margin: 0 auto;
    padding: 1.5rem;
  }
</style>
