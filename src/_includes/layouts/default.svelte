<script context="module">
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

<header class="site-header">
  <a href="/" aria-label="home" class="home-link">
    <svg
      viewBox="0 0 32 32"
      stroke="var(--primary)"
      stroke-width="2"
      width="44"
      height="44"
      aria-hidden="true">
      <line x1="1" y1="3" x2="31" y2="3" stroke-width="4" stroke="var(--mid)" />
      <path
        d="M4 4 v26 h24 v-26"
        fill="none"
        stroke-linejoin="round"
        stroke="var(--mid)" />

      <line x1="8" y1="7" x2="8" y2="13" />
      <line x1="8" y1="7" x2="8" y2="27" />
      <line x1="8" y1="21" x2="8" y2="27" />

      <line x1="12" y1="7" x2="12" y2="13" />
      <line x1="12" y1="21" x2="12" y2="27" />

      <line x1="16" y1="7" x2="16" y2="13" />
      <line x1="16" y1="21" x2="16" y2="27" />

      <line x1="20" y1="7" x2="20" y2="13" />
      <line x1="20" y1="21" x2="20" y2="27" />

      <line x1="24" y1="7" x2="24" y2="27" />

      <line
        x1="11"
        y1="17"
        x2="21"
        y2="17"
        stroke="var(--blue)"
        stroke-width="4" />
    </svg>
  </a>
  <nav>
    <ul>
      <li>
        <a
          href={url === '/' ? '#main' : '/'}
          aria-current={url === '/' ? 'page' : 'false'}>
          Home
        </a>
      </li>
      <li>
        <a
          href={url === '/blog/' ? '#main' : '/blog/'}
          aria-current={url === '/blog/' ? 'page' : url && url.includes('/blog/') ? 'true' : 'false'}>
          Blog
        </a>
      </li>
      <li>
        <a
          href={url === '/cv/' ? '#main' : '/cv/'}
          aria-current={url === '/cv/' ? 'page' : 'false'}>
          CV
        </a>
      </li>
    </ul>
  </nav>
</header>
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
