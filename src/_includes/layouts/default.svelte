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
    grid-area: main;
    justify-self: center;
    padding: 1.5rem;
  }

  @supports (display: grid) {
    main {
      display: grid;
      grid-template-columns:
        minmax(1.5rem, 1fr)
        minmax(0, 56rem)
        minmax(1.5rem, 1fr);
      align-content: start;
      grid-row-gap: 3rem;
      padding: 0;
    }
  }

  main > :global(*) {
    grid-column: 2 / 3;
  }
</style>
