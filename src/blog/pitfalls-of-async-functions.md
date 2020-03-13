---
title: "Pitfalls of async functions"
date: 2020-03-13T18:00:00.000Z
tags: ["js", "async", "promises", "performance"]
---

Async functions can seem like the holy grail for JavaScript developers who struggle to manage their asynchronous code with callbacks or promises. However there are some pitfalls that aren't necessarily obvious at first.

## Async functions

An async function is defined with the `async` keyword at the start. It works for function declarations and arrow functions:

```js
async function getData() {}
const fetchData = async () => {};
```

This keyword makes the function always return a promise, even if all the code inside of it is synchronous:

```js
async function one() {
  return 1;
}

const result = one();
console.log(result); // Promise <pending>
result.then(console.log); // 1
```

The advantage of `async` functions is that you can use the `await` keyword within them. This allows you to treat asynchronous code as if it were synchronous. Awaiting a promise will pause the execution of your `async` function until that promise resolves.

Here are two examples that fetch data from the [PokeAPI](https://pokeapi.co), one with promises and one using an async function:

```js
function getData() {
  fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(response => response.json())
    .then(data => console.log(data));
}
```

```js
async function getData() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const data = await response.json();
  console.log(data);
}
```

Lots of people prefer the async function version because it reads almost the same as synchronous code. You don't have to deal with chaining `.then()`s together and nesting callbacks.

However it's important to remember that JS is asynchronous for a reason.

## Possible performance problems

Here are the same two examples, with one extra line of code added after the fetch request:

```js
function getData() {
  fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(response => response.json())
    .then(data => console.log(data));
  console.log("unrelated stuff");
}
```

```js
async function getData() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const data = await response.json();
  console.log(data);
  console.log("unrelated stuff");
}
```

In the first promise example we fire off the network request and then keep executing the rest of our function. This means we see "unrelated stuff" logged immediately, _then_ (after some delay) the fetch request will resolve.

In the second async function example we fire off the network request, then block the rest of the function until it resolves. This means the response data will log _before_ "unrelated stuff".

This seems obvious here, but this is a common issue when coordinating multiple requests. It's easy to `await` them both and unintentionally make the requests synchronous instead of parallel:

```js
async function getData() {
  const pikaResponse = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const eeveeResponse = await fetch("https://pokeapi.co/api/v2/pokemon/eevee");
  const pikaData = await pikaResponse.json();
  const eeveData = await eeveeResponse.json();
  console.log(pikaData);
  console.log(eeveeData);
}
```

Here we don't even start fetching the second request until the first resolves, even though they are unrelated and could easily be fetched in parallel.

### Parallel async requests

We can work around this problem by only using the `await` keyword when we actually need to use a value.

```js
async function getData() {
  const pikaPromise = fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const eeveePromise = fetch("https://pokeapi.co/api/v2/pokemon/eevee");
  const pikaResponse = await pikaPromise;
  const eeveeResponse = await eeveePromise;
  const pikaData = await pikaResponse.json();
  const eeveData = await eeveeResponse.json();
  console.log(pikaData);
  console.log(eeveeData);
}
```

Now both requests are fired off, then we wait for the first response, then the second. This is still not 100% parallel though. For that we can use `Promise.all`:

```js
async function getData() {
  const pikaPromise = fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const eeveePromise = fetch("https://pokeapi.co/api/v2/pokemon/eevee");
  const [pikaResponse, eeveeResponse] = await Promise.all([
    pikaPromise,
    eeveePromise,
  ]);
  const [pikaData, eeveeData] = await Promise.all([
    pikaResponse.json(),
    eeveeResponse.json(),
  ]);
  console.log(pikaData);
  console.log(eeveeData);
}
```

`Promise.all` takes an array of promises and resolves with an array of results once they all finish. We can `await` `Promise.all` to get hold of the resolved array of results, then destructure the data we need.

In my opinion the cleanest way to achieve this actually mixes promises with `await`:

```js
async function getData() {
  const pikaPromise = fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const eeveePromise = fetch("https://pokeapi.co/api/v2/pokemon/eevee");
  const [pikaData, eeveeData] = await Promise.all([
    pikaPromise.then(response => response.json()),
    eeveePromise.then(response => response.json()),
  ]);
  console.log(pikaData);
  console.log(eeveeData);
}
```

## It's promises all the way down

One other thing I've seen developers new to async functions struggle with is that the return value is always a promise. This means you can't just call the function and use the return value directly, you either have to `await` the function itself or add a `.then()`.

```js
async function getData() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const data = await response.json();
  console.log(data); // { id: "25", name: "pikachu" }
  return data;
}

const result = getData();
console.log(result); // Promise <pending>
```

It does seem counterintuitive that you can have access to the `data` value _inside_ the async function, log it fine, but when you return it suddenly it's not there?

This makes more sense when you remember that the async function effectively pauses its execution while waiting for the request to resolve. This can't happen outside the function though: JS will move on to the rest of your code and try to run that straight away. So the return value isn't ready yet, we need to wait for that to resolve before trying to access it.

## The future

Async functions are becoming super popular, and with good reason. They make thinking about async code more natural and remove some of JavaScript's confusing parts. I'm sure they'll become more and more prevalent. Hopefully you're now slightly better equipped to spot their potential pitfalls.
