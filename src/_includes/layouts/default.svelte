<script context="module">
  import SiteHeader from "../components/site-header.svelte";
  import SiteFooter from "../components/site-footer.svelte";

  export const data = {
    layout: "layouts/base.11ty.js",
  };
</script>

<script>
  export let data;
  const {
    page: { url },
    content,
    site,
  } = data;
</script>

<SiteHeader {url} />
<main id="main">
  {@html content}
</main>
<SiteFooter {site} />

<img src="/.netlify/functions/counter" alt="" style="position:absolute" />
