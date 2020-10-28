<script context="module">
  export const data = {
    layout: "layouts/base.svelte",
  };
</script>

<script>
  export let content;
</script>

<main id="main">
  {@html content}
</main>

<style>
  main {
    width: 100%;
    max-width: 60rem;
    margin: 0 auto;
    padding: 1.5rem;
  }
</style>
