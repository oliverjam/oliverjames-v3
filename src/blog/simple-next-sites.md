---
title: Building boring websites with Next.js
date: 2021-07-24T00:00:00.000Z
tags: ["web", "react", "next.js"]
---

So Next.js is a great framework for working with React. It comes with a bunch of stuff configured out of the box that you really don't want to worry about when you're starting a project. However it has inherited a major problem from the wider React ecosystem: it massively overcomplicates making what should be a simple bloody website.

If you're just interested in how to use Next.js for simple forms you can [jump to that section](#a-better-way). First I'm going to rant a little about the current state of web development.

If you want a recap on how forms work you should check out my [HTML forms intro workshop](https://learn.foundersandcoders.com/workshops/html-forms/).

## What are we doing

A significant percentage of websites are effectively forms connected to a database. This architecture is what the web was made for, and it is conceptually quite simple:

1. The user's browser requests a page
1. Your server responds with some HTML containing a `<form action="/submit">`
1. The user fills in the form and submits
1. The browser sends a request containing all the form fields that have `name`s to your server
1. The server receives that data and puts it in the database

Here's a basic Express server that accomplishes this:

```js
const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <label htmlFor="message">Message</label>
      <input id="message" name="message" />
      <button type="submit">Save</button>
    </form>
  `);
});

server.post("/submit", express.urlencoded(), (req, res) => {
  db.save(req.body); // this part will be unique to your own DB setup
  res.redirect("/success"); // or wherever you want to go next
});

server.listen(process.env.PORT || 3000);
```

Unfortunately the React ecosystem tends to prefer solving problems with client-side JavaScript. This means a much more convoluted architecture:

1. The user's browser requests a page
1. Your server responds with some HTML containing a `<form>` (hopefully)
1. and a load of JavaScript files containing the same React components used to render the HTML (and all of the React and Next.js runtimes)
1. The JS "hydrates" (re-rendering all those components to the same HTML)
1. and attaches event listeners and other client-side behaviour
1. The user fills in the form
1. Your `onChange` listeners update React state for every input
1. The user submits the form
1. Your `onSubmit` listener prevents the default form submission
1. and takes all the state values, turns them into JSON and uses `fetch` to send them to the server
1. Your server receives the JSON and puts it in the database

Here's a basic example of this in Next.js. You can also [load the full working example](https://stackblitz.com/edit/nextjs-7ei8fp?file=pages%2Findex.js).

```jsx
// pages/index.js
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const [message, setMessage] = React.useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        fetch("/api/submit", {
          method: "POST",
          body: JSON.stringify({ message }),
        }).then(() => {
          router.push("/success"); // or wherever you want to go next
        });
      }}
    >
      <label htmlFor="message">Message</label>
      <input
        id="message"
        name="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
```

```js
// pages/api/submit.js

export default function handler(req, res) {
  if (req.method === "POST") {
    db.save(req.body); // this part will be unique to your own DB setup
    res.status(201);
  }
}
```

Not only is the second architecture worse for performance (downloading and executing tons of JS to replicate features the browser already has) it's a worse _developer experience_. You have to write a lot more code, which adds complexity that you'll have to maintain forever.

There's way more potential for things to break—if JS fails to load, or throws an error, or contains a bug, your form is totally useless. The more fields you add to your form the more complex the React state management will get. You also need a more complex server setup, since it has to transpile and bundle your React components at build time and generate all the static assets.

I am aware I'm glossing over all the reasons people do use a framework like Next.js. There are scenarios where the more complex architecture makes sense. However those are usually for much larger apps built by huge companies with big teams and a good understanding of why they're opting in to that complexity.

It just frustrates me that the habits of tech giants have taken over the industry in such a way that junior devs building simple projects get sucked into all this complexity. They're using tools that are overkill for the task at hand mostly because they need to have React projects in their portfolio to get a job.

I'm probably going to right an opinion piece on the state of the modern frontend ecosystem at some point. Until then Tom MacWright's post ["Second guessing the modern web"](https://macwright.com/2020/05/10/spa-fatigue.html) is a great summary of the problems.

## A better way

There's no reason you can't use the simple server-rendered forms architecture with Next.js. React components are a decent way to break up your UI, and I recognise how valuable it is for people to get experience with projects using it. Luckily we can have the best of both worlds: React components for rendering HTML on our server, and zero JS sent to the browser.

### Step 1: render a form

We need a basic form that can submit data. We'll put it on the homepage to keep the example simple. Create a `pages/index.jsx`:

```jsx
function Index() {
  return (
    <form>
      <label htmlFor="message">Message</label>
      <input id="message" name="message" />
      <button type="submit">Save</button>
    </form>
  );
}

export default Index;
```

Don't forget that form fields need labels that are associated with them by `htmlFor`/`id`!

### Step 2: no more JS

We're using built-in browser features rather than replicating them with client-side JS. That means there's no point sending a whole React app's worth of JS to the browser.

Next.js has supported [disabling client-side JS](https://piccalil.li/quick-tip/disable-client-side-react-with-next-js/) for a while (although the option is still marked as "unstable"). You have to do this per-page—as far as I can tell there's no global option.

```js
// pages/index.js

export const config = {
  unstable_runtimeJS: false,
};
```

Now Next.js will just send the initial HTML your components render, and nothing more. This means you can't use event listeners or other client-side code. If you're building a simple static site with some forms then that should be fine.

Note: you don't have to disable all client-side JS to use regular HTML forms. If you have other pages with lots of interaction then feel free to leave it on for those.

### Step 3: submit the form

Currently this form won't submit anywhere. We need to give it an `action` attribute to tell the browser what URL it should send the data to. This will be a [Next.js API route](https://nextjs.org/docs/api-routes/introduction), since that will execute server-side, receive our POST request, and can access the database.

```js
// pages/api/submit.js

export default function handler(req, res) {
  if (req.method === "POST") {
    db.save(req.body); // this part will be unique to your particular DB setup
    res.redirect("/success");
  }
}
```

We can then update our form with the correct `action` and `method` attributes:

```html
<form action="/api/submit" method="post"></form>
```

That's it! It's not actually so different from the "standard" Next.js example—it just removes all the faffing about with React state/fetch. The main difference is that a form element submits data encoded as the `x-www-form-urlencoded` content-type by default, whereas we were sending `application/json` beforehand. Next.js' body-parsing middleware should handle both fine, so `req.body` will always be the right thing.

Here's the [final running example](https://stackblitz.com/edit/nextjs-pslvf9?file=pages%2Findex.js) to play with.
