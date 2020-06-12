---
title: Testing your UI with React Testing Library
date: 2019-08-22T17:00:00Z
tags: ["js", "react", "react testing library", "testing"]
---

[Testing Library](https://testing-library.com) is a fantastic tool for writing UI tests. The base library works for testing anything, but there are framework-specific versions—I'll be talking about React Testing Library here.

<!-- excerpt -->

## Philosophy

We're aiming to test our components like a real user. That means rendering a React component to a real DOM, rather than shallow rendering. We should also avoid calling event handler methods directly—all interactions should happen via actual DOM events as they would when a user browses the site.

### Vanilla example

Here's a simple test for a React component (assuming you're using Jest and have access to a JSDom environment):

```jsx
function Hello() {
  return <h1>Hello world</h1>;
}

test("It should render hello", () => {
  const container = document.createElement("div");
  ReactDOM.render(<Hello />, container);
  const el = container.querySelector("h1");
  expect(el.textContent).toBe("Hello world");
});
```

This works fine, but requires some boilerplate before rendering anything. It would also be nice to have some helpers to find things in the DOM. This is where React Testing Library (RTL) comes in.

## React Testing Library

You'll need to install the library with `npm install -D @testing-library/react`.

### Basic testing

Here's our basic test from above, re-written:

```jsx
import { render, screen } from "@testing-library/react";

test("It should render hello", () => {
  render(<Hello />);
  screen.getByText("Hello world");
});
```

RTL's `render` method creates a container and renders our component into it. The `screen` import contains useful methods for querying the rendered DOM.

In this case we're using `getByText()` to search the DOM for an element matching a certain string. Any query method starting with `getBy` will throw an error if it doesn't find a match. This will fail the test, which means we don't even have to write an assertion!

These functions can take a regular expression instead of a string, which is useful for case-insensitive matching: `getByText(/hello world/i)`.

### Testing interaction

RTL provides `fireEvent` to simplify triggering DOM events. This is handy for testing user interaction:

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Toggle from "./Toggle"; // renders "off" or "on" after click

test("It should toggle on/off", () => {
  render(<Toggle />);
  const button = screen.getByText(/off/i);
  fireEvent.click(button);
  screen.getByText(/on/i);
});
```

This test checks the DOM contains an element with text content "off", then fires a click event on that element and checks its text content is now "on".

### Testing input

We can also use `fireEvent` to test user input. Since we're dispatching real DOM events here we need to pass in an event object with the properties we expect:

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Shouter from "./Shouter"; // takes user input and renders it in all-caps

test("It should make user input all-caps", () => {
  render(<Shouter label="Enter text to shout" />);
  const input = screen.getByLabelText(/enter text to shout/i);
  fireEvent.change(input, { target: { value: "hello world" } });
  screen.getByText("HELLO WORLD");
});
```

We're using `getByLabelText` to find the input with a specific label. This is nice because it also enforces accessibility best-practices—inputs should always have an associated label, so our test should fail if it doesn't.

### Testing async

RTL can help testing asynchronous UI updates too. All `getBy` methods have an equivalent `findBy` that will wait for a matching element to appear. It returns a promise that either resolves with the element or rejects after a default timeout of 4500ms.

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Info from "./Info"; // loads more info on click

test("It should load more info", async () => {
  render(<LoadMore>Some async info</LoadMore>);

  const children = screen.queryByText(/some async info/i);
  expect(children).toBeFalsy(); // should not exist until we click

  const button = screen.getByText(/more info/i);
  fireEvent.click(button);
  await findByText(/some async info/i);
});
```

We're also using the `queryBy` variant here. This will _not_ throw an error if it can't find the element. This is useful for asserting that something has _not_ been rendered yet.
