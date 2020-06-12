<script>
  export let site;
</script>

<footer id="site-footer">
  <div
    class="cluster"
    style="--space: 1.5rem; --justify: flex-end; text-align: right">
    <div>
      <h3>Social</h3>
      <ul>
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

<style>
  footer {
    grid-area: footer;
    padding: 1rem 2rem;
    font-size: 0.875rem;
  }

  h3 {
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: var(--sans-serif);
    color: var(--subtext);
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  ul {
    display: flex;
  }

  li + li::before {
    content: "/";
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    color: var(--subtext);
  }
</style>
