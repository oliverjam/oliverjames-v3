---
title: "Minimum viable GraphQL: the client"
date: 2019-11-06T15:00:00Z
tags: ["js", "graphql", "learn"]
---

GraphQL tutorials often assume you'll be using a client-side library like [Apollo](https://www.apollographql.com/) or [Urql](https://formidable.com/open-source/urql/) to manage your data-fetching. This can make it hard to separate what's GraphQL itself from stuff implemented by the library.

I'm going to demonstrate how to make basic GraphQL queries directly from the browser using vanilla JavaScript. If you know how to make `POST` requests using `fetch` then you're 90% of the way there already.

If you've never encountered GraphQL before or you're confused by any of the terminology take a look at [my previous post on GraphQL concepts](/blog/minimum-viable-graphql-concepts).

## The query

GraphQL queries can be represented as strings in JavaScript. [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) (backticks) are handy for writing multiline strings. For example:

```js
const myQuery = `
{
  allPokemon {
    name
  }
}
`;
```

## The request

We'll be sending our query as a `POST` request, with a JSON body. The GraphQL spec also allows `GET` requests using a URL-encoded query, but sending JSON is usually easier.

The body will be an object with a `query` property containing (surprisingly) our query.

## A basic query

We need to make a `fetch` call, setting the method to `POST` and passing a JSON body containing our query:

```javascript
const query = `
{
  allPokemon {
    name
  }
}
`;

fetch("https://pokemon-gql.now.sh/api", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ query }),
});
```

We can then do the standard `fetch` promise/error handling to see the result of our request:

```javascript
const query = `
{
  allPokemon {
    name
  }
}
`;

fetch("https://pokemon-gql.now.sh/api", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ query }),
})
  .then(response => {
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  })
  .then(json => {
    console.log(json);
  })
  .catch(error => {
    console.error(error);
  });
```

If successful this should log:

```json
{
  "data": {
    "allPokemon": [
      { "name": "bulbasaur" },
      { "name": "ivysaur" },
      { "name": "venusaur" },
      { "name": "charmander" },
      { "name": "charmeleon" },
      { "name": "charizard" },
      ...
    ]
  }
}
```

## A query with variables

We can update our query to take an argument (see [this section of the previous post](/blog/minimum-viable-graphql-concepts/#dynamic-argument-variables) for more details).

```javascript
const query = `
query Pikachu($name: String!) {
  pokemon(name: $name) {
    id
    name
    weight
  }
}
`;
```

We need to add a `variables` key to our body object to pass in dynamic values. The query itself should always be a static string (like SQL queries).

`variables` should be an object containing all the arguments your query requires. In this case we only need one: the `name`.

```javascript
const query = `...`;

const variables = { name: "pikachu" };

fetch("https://pokemon-gql.now.sh/api", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ query, variables }),
})
  // ... standard promise stuff
  .then(console.log);
```

If successful this should log:

```json
{
  "data": {
    "pokemon": {
      "id": "25",
      "name": "pikachu",
      "weight": 60
    }
  }
}
```

### Dynamic variables

If we want our variables to be dynamic (maybe taken from user input) we can create a reusable fetching function that takes the variables as arguments.

```javascript
const query = `...`;

function fetchPokemon(name) {
  return fetch("https://pokemon-gql.now.sh/api", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables: { name } }),
  }).then(response => {
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  });
}

fetchPokemon("pikachu")
  .then(console.log)
  .catch(console.error);
```

We could then call `fetchPokemon` inside an event handler where we have a user's chosen name.

## A complete example

Here's [a small demo app](https://codepen.io/oliverjam/pen/wvwQGXd?editors=1111) that let's you search for Pokémon by name.
