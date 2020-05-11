const html = String.raw;

const domain = "https://oliverjam.es";

function getMentions() {
  return fetch(
    "https://webmention.io/api/mentions.jf2?target=" +
      domain +
      window.location.pathname
  )
    .then((res) => {
      if (!res.ok) throw new Error("Network error fetching webmentions");
      return res.json();
    })
    .then((json) => json.children || [])
    .catch(console.error);
}

const root = document.querySelector("#comments");

function Reply(m) {
  const readableDate = new Date(m.published).toLocaleDateString(
    navigator.location,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  return html`
    <div class="h-entry">
      <img
        src="${m.author.photo}"
        class="u-photo"
        id="mentionImage"
        width="32"
        height="32"
        alt=""
        loading="lazy"
      />
      <div class="mention-body">
        <div class="mention-meta">
          <a href="${m.author.url}" class="p-name u-url">${m.author.name}</a>
          <span aria-hidden="true">•</span>
          <time
            class="dt-published"
            title="${m.published}"
            datetime="${m.published}"
            ><a class="u-url" href="${m.url}">${readableDate}</a></time
          >
        </div>
        <div class="e-content">${m.content.html || m.content.text}</div>
      </div>
    </div>
  `;
}

function Avatar(l) {
  return html`
    <li class="avatar">
      <img
        src="${l.author.photo}"
        title="${l.author.name}"
        class="u-photo"
        width="2em"
        height="2em"
        alt=""
        loading="lazy"
      />
    </li>
  `;
}

getMentions().then((mentions) => {
  if (mentions.length === 0) return;

  const likes = mentions.filter((m) => m["wm-property"] === "like-of");
  const reposts = mentions.filter((m) => m["wm-property"] === "repost-of");
  const replies = mentions.filter((m) => m["wm-property"] === "in-reply-to");

  const dom = html`
    <section aria-label="Mentions">
      <div class="cluster">
        <div class="with-icon">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="var(--primary)"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
          <span>${likes.length} likes</span>
        </div>
        <div>
          <ul class="cluster" style="--space: 0 ">
            ${likes.slice(0, 5).map(Avatar).join("")}
          </ul>
        </div>
        ${likes.length - 5 > 0
          ? html`<a href="${likes[0].url}">+ ${likes.length - 5} more</a>`
          : ""}
      </div>
      <div class="cluster">
        <div class="with-icon">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary)"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M17 2.1l4 4-4 4"></path>
            <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4"></path>
            <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"></path>
          </svg>
          <span>${reposts.length} reposts</span>
        </div>
        <div>
          <ul class="cluster" style="--space: 0 ">
            ${reposts.slice(0, 5).map(Avatar).join("")}
          </ul>
        </div>
        ${reposts.length - 5 > 0
          ? html`<span>+ ${reposts.length - 5} more</span>`
          : ""}
      </div>
      <ul class="replies">
        ${replies.map(Reply).join("")}
      </ul>
    </section>
  `;
  root.innerHTML = dom;
});
