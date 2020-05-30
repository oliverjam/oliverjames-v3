<script context="module">
  export const data = {
    layout: "layouts/base.11ty.js",
  };
</script>

<script>
  import SiteHeader from "../components/site-header.svelte";
  import SiteFooter from "../components/site-footer.svelte";

  export let data;
  const {
    page: { url },
    content,
    site,
  } = data;
</script>

<SiteHeader {url} />
{@html content}
<SiteFooter {site} />
