<script context="module">
  export const data = {
    layout: "layouts/base.11ty.js",
  };
</script>

<script>
  import SiteHeader from "../components/site-header.svelte";
  import SiteFooter from "../components/site-footer.svelte";

  export let page, content, site;
</script>

<SiteHeader url={page.url} />
{@html content}
<SiteFooter {site} />
