---
title: Where we're going, we don't need servers
date: 2020-01-23T12:00:00.000
tags: ["react", "serverless"]
---

One of the nicest things about building a single-page app is that you don't need a server. All your application logic can happen client-side, which means you only have to deploy some static HTML, CSS and JS files. There are a plethora of great (free!) options for this. My favourite is Netlify.

## Maybe we do need a server

However you'll quickly hit a point where you need just a _tiny taste_ of a server. This usually happens when you have an API secret that you don't want to leak—if all your code is client-side there's no way to hide anything.

Have we lost all the nice benefits of our static app? Do we have to maintain and deploy a separate backend repo (or try and deploy both from one repo)? It seems like overkill to have to build an entire Express app when all you want is a single endpoint that takes your request, attaches an API secret and forwards it on.

## Enter Netlify Functions

As usual Netlify is out there making my job easier. Their "Functions" service allows you to write and deploy backend code from within the same repo as your frontend. These are technically "serverless functions" (or "lambdas" in Amazon-speak), but what that really means is a backend endpoint that runs a function whenever it gets a request. It's like on-demand Express routes.

### Netlify Dev

Before we begin we should install the [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation). It allows you to run the entire Netlify production environment locally on your machine. This lets you test Functions, redirects and other config you may have set up.

You can `npm install -g netlify-cli` to give you access to the `netlify` command anywhere. You can now run `netlify dev` inside a project and it should detect the project type and start up a dev server automatically.

### Getting started with Functions

First we need to tell Netlify where our Functions will live. Create a `.netlify.toml` file at the root of your project. This allows us to configure all of Netlify's features within our repo.

```toml
[build]
  functions = "functions"
```

Now Netlify knows where to put them we can use the CLI to create one for us. Run `netlify functions:create`. It should ask you to choose a template—for now pick the basic hello world example.

You should see a new file at `functions/hello/hello.js` that contains this code:

```js
exports.handler = async (event, context) => {
  try {
    const subject = event.queryStringParameters.name || "World";
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
```

Important: the export _must_ be named "handler" for this to work.

### Anatomy of a Function

Each Function is passed two arguments: the request object (commonly named `event`) and the `context` object (containing info about e.g. authentication).

`event` has properties like the request querystring and body ready for you to use.

When you're ready to respond to the client you return an object with at least `statusCode` and `body` properties.

### Async vs callback

The example above uses an `async` JS function. This allows you to simply return an object for the response. Async functions always return promises, so Netlify will wait for the promise to resolve before sending the response.

If you don't like `async` you can also use callbacks: the handler function receives a third callback argument that you can call with the response object:

```js
exports.handler = (event, context, callback) => {
  callback({
    statusCode: 200,
    body: "hello",
  });
};
```

### Sending requests

The endpoint is defined by the filesystem. Since our file is named `hello.js` it'll be the `/hello` route.

This means a request sent to `/.netlify/functions/hello?message=everyone` would receive a response of `{ "message": "Hello everyone" }`.

Note the `.netlify/` part—this namespaces Netlify stuff so it doesn't clash with routes your actual app might be using.

### Using environment variables

If you're using `netlify dev` to run your site locally it will automatically have access to environment variables you have set in the Netlify UI. So if you've created an environment variable in the UI named "API_SECRET" you should be able to access it in your Functions with `process.env.API_SECRET`.

First you will have to authorize the Netlify CLI by running `netlify login`.

If you have already deployed this repo to Netlify you can run `netlify link` to link the Netlify CLI with the deployed site.

If you haven't deployed it yet you can run `netlify init` to link and deploy right from the command line.

Once you've linked the site you should see a `.netlify/state.json` file created, which contains the `"siteID"` referring to your deployed site.

#### Multiple users

There is a downside here: you have to log in to the Netlify account that owns the site in order to link them and access the API secrets. The easiest way to work around this if you have multiple people working on the project is to create a shared account you can all log in to.

Alternatively you can pay for Netlify, which allows you to have multiple users in your team.

## Using with Create React App

If you use `netlify dev` to run your local environment you don't need any special config. Running that command will start both the CRA server (on port `3000` by default) and the Functions server (on a random port). It will also start your entire combined app on port `8888`. This is where the magic happens: your React code can now make requests to `/.netlify/functions/hello`.

Important note: the React app on port `3000` _won't work_ as it won't be able to reach the Functions. Make sure you're using the Netlify-Dev-served version on `8888`.

### Without Netlify Dev

If you can't or don't want to use Netlify Dev it's a little more complicated. You'll need to run your Functions server manually (say on port `9000`), then [set up a proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development) in your React app so that requests get forwarded to that port. Netlify have a good [example project](https://github.com/netlify/create-react-app-lambda) with this set up (but Netlify Dev really is a lot easier).
