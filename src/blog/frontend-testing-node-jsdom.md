---
title: Frontend testing in Node with jsdom
date: 2022-05-18
tags: js, testing, jsdom
---

Sometimes you want to write some simple tests for a JS app that runs in the browser. Unfortunately this can be quite difficult, for a number of reasons. However with the right configuration the jsdom library can help us easily test our DOM code using Node so the tests run right in our terminal.

<!-- excerpt -->

## The problem

The browser and Node might share the JavaScript language, but they are very different environments. This means it can be awkward to wrangle things when you have some code written for the browser (accessing browser APIs like `document.querySelector`), but you want to _execute_ that code in a more convenient Node environment (e.g. to run some tests in your terminal).

You cannot simply import browser-JS into Node, since it will rely on a bunch of missing global variables like `document` or `window`. If you want to write anything but a simple unit test you will probably need the accompanying HTML too—the elements the JS manipulates.

## Testing in the browser

You can get around this problem by sacrificing some convenience and running your tests _in the browser_. This means including your test files as `<script>` tags in your HTML, and using the _browser_ console as the place to view test results. The QUnit testing library [can be used this way](https://qunitjs.com/intro/#in-the-browser).

This isn't ideal though, since your tests aren't really _automated_ anymore. You have to manually open the HTML file in a browser, then open the console to view the results. This precludes for example running the tests as part of a continuous integration pipeline to automatically catch any bugs you've introduced.

## Testing in Node

The [jsdom Node library](https://github.com/jsdom/jsdom) is a huge, complex piece of magic. It effectively reimplements swathes of the browser APIs purely in Node. This means we can give it some browser-code, have it run that code, then query the resulting document _from inside Node_ without ever involving a real browser.

There are of course some complications to setting this up, which I have documented here. Let's try and write a test for a simple DOM app that converts a string to uppercase. Here's the brief source code:

```html
<!-- index.html -->
<form>
  <label
    >Text to uppercase
    <input name="input" />
  </label>
  <button>Convert</button>
  <output name="output"></output>
</form>
<script>
  console.log("hello from the browser");
</script>
<script src="index.js"></script>
```

```js
// index.js

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let input = event.target.elements.input.value;
  let output = event.target.elements.output;
  onput.textContent = input.value.toUpperCase();
});
```

The code examples will assume you're using Node 18 and writing ES Modules rather than CommonJS (i.e. using `import/export`, not `require`).

### Loading an HTML file

jsdom's primary API is to load a string of JS. In our case we would like to load an HTML file, since that's how our app is structured. Luckily jsdom provides a method for this:

```js
// test.js

import { JSDOM } from "jsdom";

let dom = await JSDOM.fromFile("index.html");
console.log(dom.window.document);
```

Running this code in your terminal with `node test.js` will log an actual document object for the HTML file you loaded. Magic!

### Getting scripts to run

Unfortunately we _don't_ see our "hello from the browser" message logged. This is because by default jsdom won't execute any scripts inside the HTML file. This is because that JS will technically execute in your Node environment, which is more privileged than the browser sandbox. It would be dangerous to run untrusted input here, since some malicious code could execute directly on your computer (e.g. potentially with access to the file system).

Since we know we'll only be running scripts that we wrote we can tell jsdom that it's safe:

```js
// test.js

import { JSDOM } from "jsdom";

let dom = await JSDOM.fromFile("index.html", {
  runScripts: "dangerously",
});
```

Now re-running our test should show our browser-side log in the terminal too.

### Writing the test

Let's try and write a simple test for our app. It should use jsdom to load the HTML, grab the input element, fill in a value, click the submit button, then check the output contains the right value.

To keep things simple and avoid any new dependencies we'll use [the new testing API in Node 18](https://nodejs.org/en/blog/announcements/v18-release-announce/#test-runner-module-experimental). This is similar to the [Tape](https://github.com/substack/tape) testing library.

```js
import test from "node:test";
import assert from "node:assert";

test("app converts lowercase to uppercase", async () => {
  let dom = await JSDOM.fromFile("index.html", {
    runScripts: "dangerously",
  });
  let document = dom.window.document;
  let input = document.querySelector("input");
  input.value = "hello world";
  let button = document.querySelector("button");
  button.click();
  let output = document.querySelector("output");
  assert.equal(output.textContent, "HELLO WORLD");
});
```

If we run this our test fails and logs a jsdom error:

```
Error: Not implemented: HTMLFormElement.prototype.requestSubmit
```

### Loading external resources

There are a few layers to this problem. First jsdom [does not implement _every_ browser feature](https://github.com/jsdom/jsdom#unimplemented-parts-of-the-web-platform), since implementing an entire browser in Node is an enormous undertaking. One of the main things they leave out is _navigation_. This includes not only link clicks, but also form submissions (since they navigate to a new page by default).

So we are seeing this error because the form submission is trying to navigate. This should not be happening though, because our submit handler includes this line:

```js
event.preventDefault();
```

This should stop the default navigation and allow our submit handler to run. It seems like jsdom is not actually running our JS code. We can verify this by adding a log inside `index.js`—it won't show up.

It turns out jsdom does not load external resources by default. This means linked CSS or JS files will not be loaded. We can change this with the `resources` option:

```js
let dom = await JSDOM.fromFile("index.html", {
  runScripts: "dangerously",
  resources: "usable",
});
```

### Waiting for external resources

Running the test again will still fail with the same error. There is another problem—jsdom acts like a real browser, in that it returns the document to you before it has finished loading everything. The promise it returns resolves with the DOM before all the external CSS/JS files load. This means our test code runs _before_ our `index.js` code, so our form submit handler is not listening yet.

We can fix this by waiting for the `load` event to fire on the DOM's `window` before running our test:

```js
let dom = await JSDOM.fromFile("index.html", {
  runScripts: "dangerously",
  resources: "usable",
});
await new Promise((resolve) => dom.window.addEventListener("load", resolve);
// ... test code here
```

This promise will not resolve until the `load` event fires, which signifies that our `index.js` script tag has finished loading.

Running this test should work!

### Abstracting jsdom

We're likely to want to write more than one test, and it would be annoying to copy this code for each one. It's a good idea to load the app fresh each time to ensure the tests are fully isolated from each other, so lets abstract the jsdom setup into a `load` function that just needs a filename:

```js
async function load(file) {
  let dom = await JSDOM.fromFile(file, {
    runScripts: "dangerously",
    resources: "usable",
  });
  return new Promise((resolve) => {
    dom.window.addEventListener("load", () => {
      resolve({
        window: dom.window,
        document: dom.window.document,
      });
    });
  });
}
```

Now we can use this in any test we need to access the DOM:

```js
test("app converts lowercase to uppercase", async () => {
  let { document } = await load("index.html");
  let input = document.querySelector("input");
  input.value = "hello world";
  let button = document.querySelector("button");
  button.click();
  let output = document.querySelector("output");
  assert.equal(output.textContent, "HELLO WORLD");
});
```

You can see the full example in [the GitHub repo](https://github.com/oliverjam/frontend-testing-jsdom).
