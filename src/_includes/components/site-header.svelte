<script>
  export let url;
</script>

<header>
  <a href="/" aria-label="home">
    <svg
      viewBox="0 0 32 32"
      stroke="var(--primary)"
      stroke-width="2"
      width="44"
      height="44"
      aria-hidden="true">
      <line
        x1="1"
        y1="3"
        x2="31"
        y2="3"
        stroke-width="4"
        stroke="var(--primaryShadow)" />
      <path
        d="M4 4 v26 h24 v-26"
        fill="none"
        stroke-linejoin="round"
        stroke="var(--primaryShadow)" />

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
        stroke="var(--primaryShadow)"
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

<style>
  header {
    grid-area: header;
    display: flex;
    align-items: center;
    padding: calc(1rem + 1vw);
    font-size: 0.875rem;
  }

  svg {
    display: block;
  }

  nav {
    margin-left: auto;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }

  li + li {
    margin-left: 1rem;
  }

  a {
    text-decoration-thickness: 0.125rem;
    text-underline-offset: 0.25rem;
  }

  a[aria-current="page"],
  a[aria-current="true"] {
    text-decoration-line: underline;
    text-decoration-color: var(--primary);
  }
</style>
