---
title: "First-class functions in JavaScript"
date: 2019-12-11T13:15:00.000Z
tags: ["js", "functions"]
---

In JavaScript functions are treated like any other variable. This is sometimes referred to as “first-class functions”. The concept can be tricky for beginners, so I'm going to try and explain exactly what it means.

<!-- excerpt -->

## Functions are variables

When you create a function in JS you are creating a normal variable:

```js
function returnsOne() {
  return 1;
}
// we now have a variable named returnsOne
```

This is still true (and perhaps more obvious) for arrow functions:

```js
const returnsOne = () => 1;
```

You can reference this variable the same way you would any other:

```js
console.log(returnsOne);
// function returnsOne()
```

You can pass this function to other functions as arguments:

```js
function logger(x) {
  console.log(x);
}

logger(returnsOne);
// function returnsOne()
```

## Functions are _callable_

The main distinction between a function and other types of variable is that you can _call_ a function. You call a function by putting parens (normal brackets) after it:

```js
returnsOne();
```

Calling a function will run the lines of code inside of it. If you try to reference the _called_ function as a value you'll get whatever the function returns:

```js
const myValue = returnsOne();
console.log(myValue); // 1
```

If the function returns nothing you'll get `undefined`:

```js
function returnsNothing() {
  // doesn't have a return statement
}
const myValue = returnsNothing();
console.log(myValue); // undefined
```

This is often a source of confusion when passing functions as arguments. It's easy to accidentally call your function as you reference it, which means you're actually passing its return value:

```js
function logger(x) {
  console.log(x);
}

logger(returnsOne);
// function returnsOne()

logger(returnsOne());
// 1
```

This is clear if we log the _type_ of the value:

```js
console.log(typeof returnsOne);
// function

console.log(typeof returnsOne());
// number
```

## Inline functions

Another source of confusion is functions defined inline. This is a common pattern for passing functions as arguments to other functions (for example as event listeners):

```js
form.addEventListener("submit", event => {
  // do stuff
});
```

We can extract this inline function and assign it to a variable:

```js
const handleSubmit = event => {
  // do stuff
};

form.addEventListener("submit", event => handleSubmit(event));
```

This can be _even simpler_ if we realise that all our inline function is doing now is taking an argument and passing it on to `handleSubmit`. We don't need the intermediary wrapper function at all:

```js
const handleSubmit = event => {
  // do stuff
};

form.addEventListener("submit", handleSubmit);
```

It's important to note that we don't want to _call_ our function when we pass it here. This won't work as we need to pass a function, not its return value:

```js
const handleSubmit = event => {
  // do stuff
};

form.addEventListener("submit", handleSubmit());
// this is equivalent to:
// form.addEventListener("submit", undefined);
// since handleSubmit doesn't return anything
```

## Built-in functions

These rules apply to any functions, not just those you define yourself. For example if you wanted to log the result of a promise:

```js
getAsyncData().then(data => console.log(data));
```

The `.then` method expects to be passed a function as an argument. It will call whatever function we pass it with the resolved data. In this case our inline arrow function will be called with `data`, which we then pass on to the `console.log` function.

It's important to note that we are _defining_ a function here, which means we can call the argument anything:

```js
getAsyncData().then(whateverWeLike => console.log(whateverWeLike));
```

The actual value that gets passed to our function comes from inside the `.then`—we never have control of it.

Next lets extract the inline function to a named variable, then reference it inside the `.then`:

```js
function logData(whateverWeLike) {
  console.log(whateverWeLike);
}

getAsyncData().then(logData);
```

This works, but there's an even simpler way. We can get rid of our wrapper function entirely, since all it does is forward whatever argument it receives on to `console.log`. Since `console.log` is already a function we can use it as-is:

```js
getAsyncData().then(console.log);
```

## Further reading

You can learn more about first-class functions in [Chapter 2](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/ch02.html) of the [Mostly Adequate Guide To Functional Programming](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/). I highly recommend reading at least the first few chapters, as they will improve your JavaScript whether you become a hardcore functional programmer or not.
