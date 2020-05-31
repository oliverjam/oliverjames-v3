<div id="comments" class="webmentions" />

<svelte:head>
  <script defer src="/assets/js/webmentions.js">

  </script>
</svelte:head>

<style>
  .webmentions {
    margin-top: 4rem;
    font-size: 0.875em;
  }

  .webmentions > :global(* + *) {
    margin-top: 2rem;
  }

  .webmentions :global(.avatar + .avatar) {
    margin-top: 0;
    margin-left: -0.5rem;
  }

  .webmentions :global(.replies) {
    padding: 0;
  }

  .webmentions :global(.h-entry) {
    margin-top: 2rem;
    display: flex;
  }

  .webmentions :global(.u-photo) {
    width: 2rem;
    height: 2rem;
    flex: 0 0 auto;
    border-radius: 50%;
    object-fit: cover;
    background-color: var(--subtext);
  }

  @media (min-width: 40em) {
    .webmentions :global(.u-photo) {
      width: 2.75rem;
      height: 2.75rem;
    }
  }

  .webmentions :global(.mention-body) {
    margin-left: 1rem;
  }

  .webmentions :global(.mention-meta) {
    font-size: 0.75em;
  }

  .webmentions :global(.mention-meta a) {
    font-family: var(--sans-serif);
    line-height: 1;
    text-decoration: none;
  }

  .webmentions :global(.mention-meta a:hover) {
    text-decoration: underline;
  }

  .webmentions :global(.p-name) {
    font-weight: bold;
  }

  .webmentions :global(.dt-published) {
    color: var(--subtext);
  }

  .webmentions :global(.e-content) {
    margin-top: 0.25rem;
    line-height: 1.3;
  }

  .webmentions :global(.e-content a) {
    text-decoration: underline;
    color: inherit;
  }
</style>
