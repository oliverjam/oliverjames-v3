---
title: Static typing in JavaScript with Flow
date: 2019-06-12T13:00:00Z
tags: ["js", "types", "flow"]
---

Flow is a library for adding types to your JavaScript. It's a way to get some of the benefits of a statically typed language whilst still writing the JavaScript you know and love.

<!-- excerpt -->

<div style="padding: 2rem; background-color: var(--bg-contrast); grid-column: md-breakout">

**Disclaimer**

This was written a year ago as an introduction to static typing and the Flow library to help onboard new developers into my team at Ticketmaster. It's very likely Flow has published new major versions with new features since then; I apologise in advance for any out-of-date information.

</div>

## What are types?

A type is something that tells the language what a piece of data is and how it's intended to be used. For example JavaScript has 6 "primitive" types:

1. Boolean
1. Null
1. Undefined
1. Number
1. String
1. Symbol (new in ES6)

and a 7th type: Object. Functions are technically also objects that happen to be callable.

You don't really need to understand JS types in detail to use Flow, but if you're interested there's [more info on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures).

## What is static typing?

JavaScript is a _dynamically_ typed language. This means the language figures out what a piece of data should be when your program is running.

There are benefits to this: the language doesn't have to be compiled before you can run your code, and it's friendlier to beginners because you don't have to think about types yourself.

There are also downsides: it's easy to mix up your types and try to do something like `4 + '20'`, which often results in strange bugs. You also don't get lots of helpful editor features as you write your code, like smart auto-completion and error highlighting when you try to do things you shouldn't.

_Statically_ typed languages on the other hand either require you to explicitly state what type a data structure is when you create/use it, or will _infer_ the type for you.

This results in slightly more work up-front: thinking about what types your data should be and recording them, but often results in better, more resilient code.

## What is Flow?

Flow gives us a way to add static types to our JavaScript. You add type annotations to your normal JS code, and the Flow library will check your codebase and ensure everything is correct. There are also editor integrations that can check your code as you write and highlight errors for you.

### How do I get it?

Install Flow with `npm i -D flow-bin`. Run `npx flow init` to generate a `.flowconfig` file at the root of your project. It's fine for this to be empty, it just tells Flow where to start. If you need to configure Flow later you'll use this file.

You can run Flow on your project with `npx flow`. You might notice this doesn't do anything. That's because Flow is designed to be adopted incrementally: you need to opt files in to Flow checking by adding `// @flow` to the top.

#### Removing types

Since Flow isn't valid JavaScript you need to strip the types out of your code before it runs in a browser. You can do this with the Flow Babel preset.

If aren't already using Babel install it and the preset with `npm i -D babel-cli babel-preset-flow`.

Add the preset to a `.babelrc` file at your project's root:

```json
{
  "presets": ["flow"]
}
```

If you didn't have a build step before add an npm script for running Babel: `"build": "babel my-src my-output"`

## Using Flow

### Type inference

Flow will infer types from your code, so you don't _technically_ need to write type annotations. For example this function:

```javascript
const add = (a, b) => a + b;
```

won't cause any Flow errors. You could call it with `add(1, 2); // 3` or `add('Hello', ' world'); // 'Hello world'` without problem. However Flow doesn't know what your _intent_ for this function is, so it also won't error if you call it with `add(1, '2'); // '12'`.

This isn't really making full use of the power of Flow. If your intent for this function is to add two numbers together then you need to communicate that to Flow.

### Basic type annotation

We can tell Flow what types our function parameters should be like so:

```javascript
const add = (a: number, b: number) => a + b;
```

This tells Flow that `a` and `b` should always be numbers.

We can also annotate the return value of the function, to ensure that we always get back what we expect:

```javascript
const add = (a: number, b: number): number => a + b;
```

Now Flow will error if we call the function with `add(1, '2'); // Cannot call 'add' with '2' bound to 'b' because string is incompatible with number`

You can see this yourself and play around with it in the [Flow Repl online](https://flow.org/try/#0PQKgBAAgZgNg9gdzCYAoVBjOA7AzgFzAEMATEsAXjAAoiAuMbAVwFsAjAUwCcAaMNhs3bcAlINaculAHzEwAan7pSJagEY+AcgBMmkUA)

### Flow types

#### Primitive types

Flow supports all the JS primitive types listed above. Arrays and objects are handled slightly differently because they can _contain_ other types.

##### Array types

You specify an array type with `Array<type>`. So an array of numbers would be `Array<number>`. You can put any other Flow type inside an array. If your array contains values of different types you can use the [`mixed` type](#Mixed-types) explained below (`Array<mixed>`).

These can be made even more specific by using a "tuple" type. This is like an array but with a specific length and specific type per "slot". These are defined using square brackets: `[string, number, string]`. This tuple must contain 3 things: a string, a number and another string, in that order.

##### Object types

You can create object types with a similar syntax to JS objects:

```jsx
const Component = (props: { name: string }) => <div>Hello {props.name}</div>;
```

Object types can have optional properties marked with a question mark:

```jsx
const Component = (props: { name?: string }) => (
  <div>Hello {props.name || "world"}</div>
);
```

This can get confusing when combined with object destructuring:

```jsx
const Component = ({ name }: { name: string }) => <div>Hello {name}</div>;
```

In these cases using [type aliases](#Type-aliases) can be more readable (especially as the number of object properties grows).

It's also possible to type objects that aren't static (e.g. they may have dynamically added or removed properties). You can use square brackets to specify a type for the object's keys:

```javascript
const takesObject = (x: { [string]: number }) => ...;
```

This means `x` is an object that always has string keys and number values, but may have any number of properties.

#### Literal types

You can also use literal values as types. For example if a string should always be `'open'` you can set the type as `'open'` instead of `string`.

#### Union types

"union" types allow a value to be more than one type. For example we could allow our `add` function to accept numbers _or_ strings:

```javascript
const add = (a: number | string, a: number | string): number =>
  Number(a) + Number(b);
```

Note that you must ensure you're returning the correct type (here by converting the arguments to numbers before adding them).

Union types can be powerful when combined with literal types:

```javascript
const getColour = (status: 'success' | 'warning' | 'danger') => {
  switch(status):
    case 'success': return 'green';
    case 'warning': return 'orange';
    case 'danger': return 'red';
};
```

Now Flow knows that `getColour` should only ever be passed 'success', 'warning' or 'danger' and will error if anyone ever tries to pass something different.

This makes using strings in this way (known as "enums") much safer and more powerful (see [this Tweet on using enums instead of booleans for state values](https://twitter.com/DavidKPiano/status/972620672743673856)).

#### Mixed types

Sometimes you want to allow any type of input to a function because you know you're going to handle it in the code. You can use the `mixed` type for this:

```javascript
const stringify = (a: mixed): string => {
  if (typeof a === "string") return a;
  if (typeof a === "null" || typeof a === "undefined") return "";
  if (typeof a === "number" || typeof a === "boolean") return a.toString();
  if (Array.isArray(a)) return a.join(" ");
  if (typeof a === "object") return turnObjectIntoString(a);
};
```

This is a bit contrived but you get the idea. You can pass anything in to the function, but because the return value should be a string you need to handle all the different possible argument types inside the function.

#### Maybe types

You can mark an argument as a `maybe` type with a question mark:

```javascript
const exponentize = (value: number, exponent: ?number) => {
  if (exponent) return value ** exponent;
  return value ** 2;
};
```

Flow will allow this argument to be missing, `null` or explicitly set to `undefined`.

You will need to check the value is available in your code before you use it otherwise Flow can't guarantee that you won't hit a null/undefined error at runtime.

#### Danger: any type

Flow offers an escape hatch for code that you might want to be checked, but you don't have to time to add proper types to right now. You can use `any` as a type to completely opt out of Flow checking for that value.

Be careful with this as `any` can leak through your code as you use the value in other places.

### Type aliases

Sometimes you want to split out a long or complex type so it doesn't pollute a function declaration. It's also helpful to be able to reuse common types. You can create type aliases for this using the `type` keyword:

```javascript
type ViewportType = {
  small: 320,
  medium: 480,
  large: 768,
  xlarge: 1200
}

const MediaQueries = (viewports: ViewportType) => ...;
```

These can be imported and exported just like normal JS objects.

### Sharing types

The simplest way to share types is to create type aliases. These can be used throughout a file, or exported to import in another file.

If you find yourself using lots of aliases it might be useful to make them available globally. The simplest way to do this is to create a folder called `flow-typed` at the root of your project. Anything in here will automatically be picked up by Flow.

### Third-party code

It wouldn't be a JavaScript project without some `node_modules`. Flow needs type definitions for any third party code that you're relying on in order to work effectively.

Some libraries export untranspiled copies of all their JS files (with Flow types intact) as `.js.flow` files. In this case Flow will automatically find the types and work without you doing anything.

The [`flow-typed`](https://github.com/flowtype/flow-typed) project exists for libraries that don't have their own Flow type definitions. It's a repository of user-submitted typings for popular libraries. You can run `npx flow-typed install package@version` to generate type definitions for a package in your `flow-typed` directory.

If `flow-typed` doesn't have definitions for a library it can optionally create a "stub" of empty types, which will at least stop Flow generating errors for the library.
