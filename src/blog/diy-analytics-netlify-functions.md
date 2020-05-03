---
title: Build your own analytics with Netlify Functions
date: 2020-05-02T16:10:00.000Z
tags: ["js", "analytics", "netlify", "serverless"]
---

I recently decided I would be more motivated to write blog posts if I had some indication that people were reading them. This meant setting up some kind of analytics.

<!-- excerpt -->

## DIY, not Google

It would however be hypocritical of me to have privacy-violating user tracking (like Google Analytics) on my own site when I block all tracking scripts in my personal web browser.

Instead I figured I could create my own basic analytics without handing my users' data over to Google. A bare minimum analytics implementation counts each request to the server, records what page was requested, and _maybe_ some information to tell different users' requests apart.

## No JS required

I also wanted this to work without client-side JS (since the rest of my site does). It turns out the old ways are the best here—a "tracking pixel" image on every page will work as long as the user hasn't disabled image loading.

Here's roughly how a tracking pixel works: there's an `<img>` tag at the bottom of every page. This image's `src` attribute points to a server. When this server receives the request it records the `referer` header somewhere. This header is sent by the browser and contains the URL of the page the request came from.

## Serverless (AKA a server)

There was one downside to this plan: my blog doesn't have a server. It's a static website served from Netlify's CDN. Luckily Netlify has a feature called [Functions](https://www.netlify.com/products/functions/) that allows you to deploy "serverless functions" alongside your otherwise static site. I have written a full [guide to Netlify Functions](we-dont-need-servers/) if you're curious.

So the solution was to create a `functions/counter.js` Function. The tracking image's `src` would point at `/.netlify/counter` so the Function would receive a request for every page view. The Function itself grabs the `referer` header to save the page view, then responds with a 1px transparent GIF.

Here's a simplified implementation:

```js
exports.handler = async ({ headers }) => {
  console.log(headers.referer); // e.g. "https://oliverjam.es/blog"
  return {
    statusCode: 200,
    // a Base64 encoded 1px transparent gif
    body: "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    headers: { "content-type": "image/gif" },
    isBase64Encoded: true,
  };
};
```

Note we have to tell Netlify that we're returning a Base64-encoded body.

## Persisting data

Unfortunately Netlify doesn't yet have a data storage solution. This means I needed to find somewhere else to chuck the page view each time an image was requested.I started looking at some Google Cloud storage product but got overwhelmed with dashboards and regions and confusing price calculators.

Luckily there are a bunch of simple free JSON storage services like [JSONbin.io](https://jsonbin.io/) and [jsonbox.io](https://jsonbox.io/). I ended up going with jsonbox because I liked the API a bit better.

It's pretty much an array of objects stored in MongoDB and exposed via a REST API. So whenever my Function receives a request it sends a `POST` request with a JSON object containing the URL the image was loaded on (from the `referer` header):

```js
const body = JSON.stringify({ url: referer });
await fetch(ANALYTICS_URL, { method: "POST", body });
```

It's actually a bit more complicated because referers are full URLs, whereas I only cared about the pathname.

## Unique visits and browser fingerpints

Most analytics services allow you to distinguish a single viewer browsing multiple pages from multiple viewers. Since I'm only tracking anonymous requests I can't do this. It turns out reliably tracking unique visits anonymously is _hard_.

Fathom (a privacy-focused analytics service) [came up with a cool solution](https://usefathom.com/blog/anonymization), but it's overkill for my needs. Since I hardly get any visitors I compromised by recording the user-agent string for each request.

This is a string that identifies the browser that made the request. E.g. my current version of Firefox sends this user-agent header: `"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:76.0) Gecko/20100101 Firefox/76.0"`. I added this to the JSON I stored, so each visit has a pathname and user-agent.

```js
exports.handler = async ({ headers }) => {
  const data = { url: headers.referer, ua: headers["user-agent"] };
  const body = JSON.stringify(data);
  await fetch(ANALYTICS_URL, { method: "POST", body });
  //...
};
```

The user-agent is unique enough that I'm comfortable using it to identify unique visits, but it can't really identify a specific individual. [When _combined_ with other info](https://www.amiunique.org/) like IP address, language and timezone this could identify an individual, which is why I didn't include anything else.

## Conclusion

That's it. You can see the full implementation in [this site's GitHub repo](https://github.com/oliverjam/oliverjames-v3/blob/master/functions/counter/counter.js). It's surprisingly simple to build something like this with modern tooling. I had never really considered returning anything but JSON from a Netlify Function, but my mind is spinning with possibilities for serverless functions returning HTML, images and other cool stuff.

I would love to see more developers move away from including Google Analytics by default and consider either a simple DIY solution like this, or paying for a privacy-focused service like [Fathom](https://usefathom.com/).

My next project will be to turn this data into some nice looking graphs, so I can actually try and glean insights from it. I'll probably make that publicly available on this site, since the data is anonymous-ish.
