---
title: How Supabase works
date: 2021-11-30
tags: ["web", "supabase", "react", "next.js"]
permalink: false
---

Supabase is a relatively new platform for building web applications. It handles a bunch of things most apps need using a combination of open source technology. For example they provide a hosted PostgreSQL database, a JS library for talking to the DB without writing SQL, simple authentication, and a lot more.

Since the platform is quite new the documentation isn't mature yet. I have found it a little confusing to understand how all the different parts fit together. This post is intended less as a tutorial and more as an overview for people who have already tried Supabase out and want to understand it better.

## Supabase architecture

Supabase works at a pretty high level of abstraction. By this I mean that there are usually several layers of code between what you write and things actually happening. For example the Express JS library is an abstraction over Node's built-in HTTP server, which is itself an abstraction over implementing your own HTTP server. Abstractions usually provide a simpler way to do common tasks at the expense of "hiding" some of what's really happening.

I think it's important to have at least a vague understanding of how the abstractions you use work. Let's cover what Supabase is doing behind-the-scenes, since it's important to know what is being abstracted away. The docs sometimes gloss over these details.

### Project setup

When you create a new Supabase project they start up a Postgres DB for you on their servers. This is where all your project's data will be stored. You can browse and update stored data using their nice admin UI. However if you wanted you could get the connection string (`postgres://...`) and connect directly via a tool like `psql` in your terminal. This is just a normal Postgres DB.

Supabase also creates several different services to provide the various features they offer (data access, auth, realtime subscriptions etc). You can imagine they give you one big server running Postgres plus these other services to make it easier to work with the DB.

All these services live behind your project URL, which will be something like `https://my-project.supabase.co/`. You probably won't be sending HTTP requests to them directly however, since Supabase recommend using their JS client library for almost everything.

The Supabase JS client is a library that provides methods for lots of common tasks. You have to install it via npm, then import and configure it with your project URL and public API key:

```js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://my-project.supabase.co", "eyJhbG...");
```

This client lets you easily send requests to your DB, manage authentication, and lots of other things.

It's important to recognise however that you could achieve the same result by writing your own code to make HTTP requests to the various endpoints your Supabase project URL provides (it would just be a lot more work).

For example try running this `curl` command in your terminal (replacing the project name and key with your own):

```shell
curl https://MY_PROJECT.supabase.co/auth/v1/signup \
  --request 'POST' \
  --header 'apikey: MY_KEY'
  --data '{ "email": "test@example.com", "password": "123456" }' \
```

or this equivalent `fetch` in the browser:

```js
fetch("https://MY_PROJECT.supabase.co/auth/v1/signup", {
  method: "POST",
  headers: { apikey: "MY_KEY" },
  body: '{ "email": "test@example.com", "password": "123456" }',
});
```

Note that this will create a user in your DB, so be prepared to go and manually delete it afterwards!

### Accessing data

The JS client can get data from your Postgres DB. For example if you had a table named `posts`:

```js
const { data, error } await supabase.from("posts").select();
```

this would retrieve all the rows from that table.

This is several levels of abstraction above what's actually happening. The JS client gets the data by sending an HTTP request to your database server. For example in this case it's sending an HTTP `GET` request like this:

```shell
curl https://my-project.supabase.co/rest/v1/posts \
  --header "apikey: MY_KEY"
```

You may be thinking "but I didn't create an API". Supabase automatically generates a REST API based on your Postgres schema using [PostgREST](https://postgrest.org/). This will generate and run the required SQL commands to retrieve/update data based on HTTP requests.

### Authentication

Supabase's docs aren't super clear about how authentication works. There are lots of nice simple methods like `supabase.auth.signUp()` (to create a new user), but it's not obvious how the whole system fits together.

The JS client actually depends on [GoTrue JS](https://github.com/supabase/gotrue-js), which is a client for working with [GoTrue](https://github.com/netlify/gotrue), another abstraction that automatically provides API routes for authentication.

So when you call `supabase.auth.signUp()` the client sends an HTTP request to the GoTrue server for handling sign up (the `/auth/v1/signup` endpoint we saw earlier). The GoTrue server will create a user in the database table, then generate a token identifying the user and send that back.

The GoTrue JS client receives the token and stores it in `localStorage` in the browser. Now whenever other auth operations happen (e.g. `supabase.auth.user()`) it will use that token to determine who is logged in.

### Client vs server

The most important thing to understand is _where_ your code is executing. It's common nowadays to build "universal" apps. Frameworks like Next/Nuxt/SvelteKit can render your pages on the server or in the browser.

The Supabase docs don't properly distinguish between which of the JS client methods work in which environment. This is especially important when it comes to authentication. Their built-in auth methods store session information in `localStorage`—this means your server can never access it.

This is a problem if you want to server-render pages that require authentication. For example the Next framework can handle loading data using the `getServerSideProps` method. This will run on the server for every page load, fetch whatever data you need, then pass it as props to your page component.

However since this runs on the server there's no way for it to access the logged in user by default—`supabase.auth.user()` only works in the browser. This unfortunately limits you to doing all your authentication (and fetching authenticated data) client-side. This means your app cannot work without JavaScript, and requires you to manage all the data-fetching complexity yourself (hope you like writing `useEffect`).
