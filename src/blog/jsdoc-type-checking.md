---
title: Using JSDoc to check your code
date: 2022-01-28
tags:
  - js
  - typescript
---

It can be difficult to keep track of what each value is while you're writing code. This becomes a bigger problem in larger codebases with lots of abstraction—when data passes through several functions it's easy to forget what you're expecting to get back. JSDoc is a tool/convention that can help solve this problem.

<!-- excerpt -->

## Documenting your functions

It's often useful to document what our functions do. For example, if we had a function that created a new task object (for an imaginary to-do list app):

```js
function createTask(title, owner_id) {
  let created_at = Date.now();
  return { title, owner_id, created_at };
}
```

It's easy to accidentally mix up the arguments, especially working in a different file:

```js
let task = createTask(17, "Learn JavaScript");
```

We _could_ document the function with a general comment, like this:

```js
// Creates a new todo object with the title, owner_id and created_at date
function createTask(title, owner_id) {
  let created_at = Date.now();
  return { title, owner_id, created_at };
}
```

However this isn't super useful, since it requires anyone calling this from another file to open this file and read the function definition. It would be nice if our editor could automatically provide that info when we are typing the function call.

## Using JSDoc

We can instead structure our comment according to the [JSDoc](https://en.wikipedia.org/wiki/JSDoc) format, like this:

```js
/**
 * @param {string} title
 * @param {number} owner_id
 * @returns {{ title: string, owner_id: number, created_at: number }}
 */
function createTask(title, owner_id) {
  let created_at = Date.now();
  return { title, owner_id, created_at };
}
```

This comment defines all our parameters and the return value, including what _types_ of values they should be. Since this information is structured our editor can use it to give us hints.

## Configuring your editor

To get VS Code to use the JSDoc information as you're typing you have to enable the "Implicit project config: Check JS" setting. This will cause it to parse JSDoc comments as TypeScript types, even if you aren't using TypeScript. You can enable this globally ("User") or just for the current project ("Workspace").

Now you should get warnings if you misuse this function. For example if you forget an argument:

```js
let task = createTask("Learn JavaScript");
```

you should see the function underlined red, with an error like:

```
Expected 2 arguments, but got 1
  An argument for 'owner_id' was not provided.
```

If you pass an invalid type for an argument:

```js
let task = createTask(17, "Learn JavaScript");
```

you should see the incorrect argument underlined red, with an error like:

```
Argument of type 'number' is not assignable to parameter of type 'string'.
```

You should even get autocompletion and suggestions as you're typing, or if you hover the function name.

You can check [Typescript's JSDoc reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) for more information about the different things you can check with this syntax.
