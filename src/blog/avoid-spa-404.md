---
title: Avoiding 404 errors with Single-Page Apps
date: 2021-06-11
---

I see the same problem happen again and again to juniors building their first Single-Page App (SPA). Everything works fine locally, but as soon as they deploy to a hosting platform like Netlify they get loads of "404 Not found" errors trying to load pages. There are lots of resources documenting how to fix this, so I'm also going to try to explain _why_ this happens too.

## Client-side routing

Single-Page Apps differ from traditional server-rendered applications in that they only ever load one "page" from the server. This means your server only knows about a single route: the home `index.html`. The server is just there to deliver your client-side JS to the browser.

Routing is usually handled client-side—when a user clicks a link some JavaScript intercepts it, prevents the normal request to the server, updates the content of the page and changes the URL. In a React app this might be handled by the React Router library.

## The problem

In order for the client-side routing to work the home page needs to load, along with all the JavaScript code. Unfortunately this means if a user goes _directly_ to another route in their browser—i.e. clicks a link to "/about", or refreshes—they will see a 404 error.

This is because your server doesn't know about any routes like "/about". From its perspective there's only a single page—the home `index.html`. So when the server receives a request for "/about" it correctly responds with a 404.

**Note**: you generally don't catch this issue during local development since most dev servers redirect all requests to the home `index.html`.

## The solution

The solution is to tell your server to respond with the `index.html` for _any_ route. Since that page contains all the client-side JS to render any other pages the user will still end up seeing the correct page.

You can configure most static hosts to redirect all requests to the home route. I'll demonstrate how to do it with Netlify here, since I'm most comfortable with it. For other platforms you'll have to search their docs for something like "SPA routing fallback".

### Netlify

Netlify supports [configuring redirects](https://docs.netlify.com/routing/redirects/) in two ways: either a standalone file named `_redirects`, or as part of your whole `netlify.toml` config file.

Using the `_redirects` file:

```
/* /index.html 200
```

**Important**: this file must end up in the final folder that gets deployed. If you have any kind of build-step to generate the folder you should ensure `_redirects` gets copied over. E.g. using Create React App you can put it inside your `public/` directory.

Using the `netlify.toml` file:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This file generally lives at the root of your project, and you don't have to worry about it being deployed along with your site.
