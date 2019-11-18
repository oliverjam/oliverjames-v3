const domain = "https://oliverjam.es";
function getMentions() {
  return fetch(
    "https://webmention.io/api/mentions.jf2?target=" +
      domain +
      window.location.pathname
  )
    .then(res => {
      if (!res.ok) throw new Error("Network error fetching webmentions");
      return res.json();
    })
    .then(json => json.children || [])
    .catch(console.error);
}

const root = document.querySelector("#comments");
const template = document.querySelector("#mentionTemplate");

const selectWithin = node => s => node.querySelector(s);

function createMention(m) {
  const clone = document.importNode(template.content, true);
  const $ = selectWithin(clone);

  $("#mentionImage").src = m.author.photo;

  const authorNode = $("#mentionAuthor");
  authorNode.href = m.author.url;
  authorNode.textContent = m.author.name;

  const readableDate = new Date(m.published).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateNode = $("#mentionDate");
  dateNode.datetime = m.published;
  dateNode.title = m.published;

  const permalinkNode = $("#mentionPermalink");
  permalinkNode.textContent = readableDate;
  permalinkNode.href = m.url;

  $("#mentionContent").innerHTML = m.content.html || m.content.text;

  return clone;
}

function render(fragment) {
  root.appendChild(fragment);
}

function heading(text) {
  const h = document.createElement("h2");
  h.textContent = text;
  return h;
}

getMentions().then(mentions => {
  if (mentions.length === 0) return;
  root.appendChild(heading("Mentions"));
  mentions.forEach(m => {
    render(createMention(m));
  });
});
