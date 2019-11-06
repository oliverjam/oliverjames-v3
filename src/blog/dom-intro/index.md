---
title: Introduction to the DOM
date: 2019-03-03T16:30:00Z
tags: ["js", "beginner", "dom", "learn"]
---

When I first learnt JavaScript I struggled to understand how to apply that knowledge to practical web pages. I wanted to build things that actually _did stuff_, rather than static HTML/CSS pages or JavaScript things that only logged text to the console.

<!-- excerpt -->

This is my attempt to bridge the gap between JavaScript _the language_ and the bits of it you need to know to make things happen on a web page. It will assume you have a basic understanding of HTML and JS, but are new to actually using JS on a web page.

## What is the Document Object Model?

The Document Object Model (DOM) is the JavaScript representation of the elements on a webpage.

It's implemented by web browsers, rather than the JavaScript language itself. It's important to recognise this distinction—JavaScript is a general purpose programming language (although it originated on the web), but browsers implement specific [Web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs) within the language.

A browser's DOM APIs are how you access and manipulate elements within the page—for example to read the value of an input, or add another item into a list.

## Using the DOM

### Accessing elements

There are a few useful methods for accessing elements on a webpage. Almost all DOM methods live on the global `document` object, which means you access them like this: `document.someMethod()`.

#### [`document.querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

This allows you to select an element on the page using a [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

For example:

```javascript
const btn = document.querySelector("button");
```

will find the first `<button>` element on the page.

```javascript
const para = document.querySelector(".container > p.text-large");
```

will find the first `<p>` element that has a classname of `"text-large"` and is a direct child of an element with a classname of `"container"`.

#### [`document.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

This is used to select multiple elements that match the same CSS selector. It returns a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) of the matching elements.

It's important to note that a NodeList is _not_ the same as an array. This means you can't use most array methods (like `map` or `reduce`). NodeLists do have a `forEach` method if you need to do something with each element. Alternatively you can use `Array.from(nodeList)` to turn it into an array with no limitations.

For example:

```html
<button id="button-1">Hello</button>
<button id="button-2">Hello</button>
<button id="button-3">Hello</button>
```

```javascript
const btns = document.querySelectorAll("button");
btns.forEach(btn => console.log("ID is: " + btn.id));
// ID is button-1
// ID is button-2
// ID is button-3
```

#### [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element)

This is the JS representation of an element on the page. It's what you'll be dealing with once you've used `querySelector` to assign an element to a variable.

##### Element properties

A DOM element is an object with various properties. These will include attributes you may have set (e.g. `id` or `className`) as well as inherent properties like `clientWidth` and `clientHeight`.

You can access these just like any other object properties:

```html
<button class="btn--primary">Hello</button>
```

```javascript
const btn = document.querySelector("button");
console.log(btn.className, btn.textContent, btn.clientHeight);
// "btn--primary", "Hello", 44
```

Different properties will be available depending on the type of element. For example an `HTMLInputElement` like an `input` or `select` will have a `.value` property, but a basic `HTMLElement` (like a `div`) will not.

### User input

Being able to access elements on the page isn't very useful if you can't react to user actions. To do this we add an "event listener" using [`element.addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

`addEventListener` has two required arguments:

1. **Type**: The type of event to listen for (e.g. `"click"`, `"submit"` etc)
2. **Listener**: A function to run when that event happens

For example:

```javascript
const btn = document.querySelector("#my-button"); // select the first element with an ID of "my-button"
btn.addEventListener("click", handleClick);
```

would run the `handleClick` function whenever someone clicked on that button.

We need to define the `handleClick` function for this to work. The function will be called with the event that triggered this listener as its argument:

```javascript
function handleClick(event) {
  console.log(event);
}
// MouseEvent {
//   ...
//   clientX: 479
//   clientY: 238
//   target: button#my-button
//   type: "click"
//   x: 479
//   y: 238
//   ...
// }
```

There are [a lot of different events](https://developer.mozilla.org/en-US/docs/Web/Events), although you'll usually only use a few:

- [Click](https://developer.mozilla.org/en-US/docs/Web/Events/click): usually to make a button trigger something
- [Keydown](https://developer.mozilla.org/en-US/docs/Web/Events/keydown): to add keyboard controls
- [Change](https://developer.mozilla.org/en-US/docs/Web/Events/change): for reacting to updates in an input
- [Submit](https://developer.mozilla.org/en-US/docs/Web/Events/submit): to get the result of a submitted form

### Updating the DOM

You usually need to change something on the page after receiving user input. This may mean toggling an element's visibility or colour, or adding a totally new element.

#### Reading and writing attributes

Most element attributes can be set directly as object properties:

```javascript
const btn = document.querySelector("button");
btn.id = "set-from-js";
```

This will override any previous value, so be careful.

#### Adding and removing class names

Since setting a property directly only allows a single value, it can be difficult to work with multiple class names. You can use the `element.classList` API to make this easier.

##### Adding class names

```html
<button class="btn">Submit</button>
```

```javascript
const btn = document.querySelector("button");

btn.classList.add("btn--primary");
console.log(btn.className); // "btn btn--primary"
```

This will add a class without overwriting any that already exist.

##### Removing class names

```html
<button class="btn btn--primary">Submit</button>
```

```javascript
const btn = document.querySelector("button");

btn.classList.remove("btn--primary");
console.log(btn.className); // "btn"
```

##### Toggling a class name

```html
<button class="btn btn--primary">Submit</button>
```

```javascript
const btn = document.querySelector("button");

btn.classList.toggle("btn--primary");
console.log(btn.className); // "btn"

btn.classList.toggle("btn--primary");
console.log(btn.className); // "btn btn--primary"
```

This will check if a class name already exists. If so it will remove the class, otherwise it will add it.

#### Toggling element visibility

HTML5 introduced the `hidden` property. This determines whether the browser should show it. Note that this doesn't just mean visually: a hidden element will also be removed from screenreader output. It can be set like any other attribute:

```javascript
const button = document.querySelector("button");
button.hidden = true;
```

#### Creating elements

You can create totally new elements in JavaScript:

```javascript
const myButton = document.createElement("button");

button.id = "myBtn";
button.textContent = "Submit";

console.log(myButton); // <button id="myBtn">Submit</button>
```

However this element will not exist within the DOM (on the actual page) until you put it there.

```html
<div id="container"></div>
```

```javascript
const container = document.querySelector("#container");
const myButton = document.createElement("button");
button.textContent = "Submit";

container.appendChild(myButton);
console.log(container); // <div id="container"><button>Submit</button></div>
```

## Putting it all together

Let's build a to-do list to see all these concepts work together.

### Step 1: structure

We need to take user input (new to-do items), which means we'll need a `form` with some inputs. We also need to display the list of to-do items, which probably means a `ul`.

```html
<form>
  <input type="text" name="newTodo" required />
  <button type="submit">Add +</button>
</form>
<ul></ul>
```

We'll need references to some of these elements in our JavaScript.

```javascript
const form = document.querySelector("form");
const list = document.querySelector("ul");
```

### Step 2: user input

When the user submits the form with a new to-do we want to capture this. We'll do so by adding an event listener for the form's `"submit"` event.

```javascript
form.addEventListener("submit", handleSubmit);
```

We then need to write the `handleSubmit` function that will be run when the user submits the form.

```javascript
function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target); // <form>
}
```

We call the `preventDefault()` method on the event to stop the form's default behaviour from happening. This would attempt to send the submission to a server and reload the page. Since we're handling the submission entirely within JS on the page we don't want this default behaviour.

The `event.target` property refers to the element the event came from (in this case the `<form>`). This will allow us to access the elements inside the form:

```javascript
function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target.elements);
}
```

`event.target.elements` is an [`HTMLFormControlsCollection`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormControlsCollection) containing the elements within the form.

Since we gave our `input` a name attribute of "newTodo" it will be available here as `event.target.elements.newTodo`. This will give us a full reference to the input element and all its properties.

```javascript
function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target.elements.newTodo); // <input type="text" name="newTodo" required />
}
```

We need the value of this input to create our new to-do:

```javascript
function handleSubmit(event) {
  event.preventDefault();
  const value = event.target.elements.newTodo.value;
  console.log(value); // "write blog post" (whatever the user entered)
}
```

### Step 3: updating the DOM

Now that we have enough information to add a new to-do entry we can update the DOM.

First we need to create a new list element and set its text content:

```javascript
function handleSubmit(event) {
  event.preventDefault();
  const value = event.target.elements.newTodo.value;

  const newItem = document.createElement("li");
  newItem.textContent = value;
  console.log(newItem); // <li>write blog post</li>
}
```

Then we can put the new item into the DOM:

```javascript
function handleSubmit(event) {
  event.preventDefault();
  const value = event.target.elements.newTodo.value;

  const newItem = document.createElement("li");
  newItem.textContent = value;
  list.appendChild(newItem);
  console.log(list); // <ul><li>write blog post</li></ul>
}
```

### Final code

```html
<form>
  <input type="text" name="newTodo" required />
  <button type="submit">Add +</button>
</form>
<ul></ul>
```

```javascript
const form = document.querySelector("form");
const list = document.querySelector("ul");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const value = event.target.elements.newTodo.value;

  const newItem = document.createElement("li");
  newItem.textContent = value;
  list.appendChild(newItem);

  form.reset(); // reset inputs so user can enter another to-do
}
```

Here's [a working Codepen](https://codepen.io/oliverjam/pen/zbBxOz) if you want to play around. If you want some practice try adding a delete button to the to-do items.

<video autoPlay muted loop>
  <source src="/assets/media/basic-todo.mp4" type="video/mp4" />
</video>
