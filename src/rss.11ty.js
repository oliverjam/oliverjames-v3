const absoluteUrl = require("@11ty/eleventy-plugin-rss/src/absoluteUrl");
const dateToISO = require("@11ty/eleventy-plugin-rss/src/dateToISO");

const xml = String.raw;

exports.data = () => {
  return {
    permalink: "feed.xml",
    feed: {
      id: "https://oliverjam.es/",
      url: "https://oliverjam.es/feed.xml",
      path: "https://oliverjam.es/feed.xml",
      filename: "feed.xml",
    },
  };
};

exports.render = (data) => {
  const { site, feed } = data;
  const posts = data.collections.blog;
  const latestPost = posts[posts.length - 1];
  const lastUpdated = dateToISO(latestPost.data.date);

  const result = xml`
    <?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>${site.title}</title>
      <subtitle>${site.tagline}</subtitle>
      <link href="${feed.url}" rel="self"/>
      <link href="${site.url}"/>
      <updated>${lastUpdated}</updated>
      <id>${feed.id}</id>
      <author>
        <name>${site.author.name}</name>
        <email>${site.author.email}</email>
      </author>
      ${posts.reduce((acc, post) => {
        // TODO: Relative links in the excerpt need to be rewritten to
        // absolute links @see htmlToAbsoluteUrls() provided by the rss plugin
        const postUrl = absoluteUrl(this.url(post.url), site.url);
        const postDate = dateToISO(post.data.date);
        const postExcerpt = this.markdown(post.data.page.excerpt || "");

        return (
          acc +
          xml`
            <entry>
              <title>${post.data.title}</title>
              <link href="${postUrl}" />
              <updated>${postDate}</updated>
              <id>${postUrl}</id>
              <content type="html">${postExcerpt}</content>
            </entry>
          `
        );
      }, "")}
    </feed>
  `;

  return result.trim();
};
