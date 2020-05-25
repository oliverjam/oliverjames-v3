<script context="module">
  import SiteHeader from "../components/site-header.svelte";

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
<footer class="site-footer">
  <div class="cluster" style="--space: 1.5rem;">
    <div>
      <h3>Social</h3>
      <ul class="social">
        {#each site.social as { label, href, me }}
          <li>
            <a {href} rel={me && 'me'}>{label}</a>
          </li>
        {/each}
      </ul>
    </div>

    <div>
      <h3>Contact</h3>
      <p>
        <a href="mailto:{site.contact.href}" title={site.contact.href} rel="me">
          {site.contact.label}
        </a>
      </p>
    </div>
  </div>
</footer>
<img src="/.netlify/functions/counter" alt="" style="position:absolute" />
