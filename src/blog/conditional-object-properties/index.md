---
tags:
  - js
  - objects
title: Two ways to conditionally set object properties
date: 2019-09-13T11:30:00Z
---

A junior developer recently asked me how they could conditionally set a property on an object. They didn't want an always-present key with a value of `undefined`, they wanted the property not to exist at all.

<!-- excerpt -->

There's a _super fancy_ concise modern way to do this, and a simple "verbose" way.

## Conditional spread expressions

A "conditional spread expression" (I just made that term up) looks like this:

```javascript
const obj = {
  test: "one",
  ...(condition && { other: "two" }),
};
```

You may be thinking "wow that is confusing and unreadable". You would be right, but let's unpack exactly what's going on for the sake of the blog post.

There are a few different language features combining here:

1. [Expressions](https://2ality.com/2012/09/expressions-vs-statements.html)
1. [Short circuit evaluation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Short-circuit_evaluation)
1. [Object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals)

### Expressions

The bit after the `...` is an expression. Expressions are bits of code that produce a _value_, e.g. `1 + 3` resolves to `4`. The expression here will be evaluated to a value first.

### Short circuit evaluation

The "logical AND" (`&&`) operator checks if the left side is [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) and evaluates to the right hand side if so. E.g. `1 === 1 && "hello"` evaluates to `"hello"`.

If the left side is [_falsy_](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) then it "short circuits" and skips evaluating the right side. The expressions resolves to the left side instead. E.g. `1 === 2 && "hello"` evaluates to `false` and never runs the `"hello"` code.

Our conditional spread relies on this behaviour. If our condition is truthy the expression evaluates to `{ other: "two" }`. If our condition is falsy the expression evaluates to the condition, which could be any one of the 6 falsy primitives (`false`, `undefined`, `null`, `0`, `NaN` or `""`).

### Object spread operator

Finally we need to understand some nuance around the object spread operator. It allows us to take all the properties from one object and "spread" them into another object.

When our condition is truthy this means `{ other: "two" }` is spread into `obj`, resulting in:

```javascript
const obj = {
  test: "one",
  other: "two",
};
```

It's a bit more confusing to understand what happens when our condition is falsy. The [spread operator spec](https://tc39.es/ecma262/#sec-copydataproperties) says that spreading `undefined` or `null` should do nothing. So we end up with:

```javascript
const obj = {
  test: "one",
};
```

Spreading a boolean, string or number (including NaN) will first convert the value into its [corresponding wrapper object](https://developer.mozilla.org/en-US/docs/Glossary/Primitive#Primitive_wrapper_objects_in_JavaScript) (`Boolean`, `String` or `Number`). These objects will have no properties, so we are effectively spreading `{}`:

```javascript
const obj = {
  test: "one",
  ...{},
};
```

Spreading an empty object will add no new properties to the parent object.

#### Sidenote for completeness

Technically spreading a non-empty string will convert the string into an object with all its characters as properties (e.g. `{..."cat"}` results in `{ 0: "c", 1: "a", 2: "t" }`). Since only empty strings are falsy we can ignore this behaviour here.

### A simpler way

We can avoid having to understand most of the arcane spread behaviour by using a slightly longer syntax:

```javascript
const obj = {
  test: "one",
  ...(condition ? { other: "two" } : {}),
};
```

This way we are always spreading an object, and it should be relatively intuitive that spreading an empty object won't do anything.

## Keep it simple

Alternatively we could not require our co-workers to read the TC39 spec documents:

```javascript
let obj = {
  test: "one",
};

if (condition) {
  obj.other = "two";
}
```

This has the advantage of allowing multiple properties to be set based on the same condition.

```javascript
let obj = {
  test: "one",
};

if (condition) {
  obj.other = "two";
  obj.otherRelatedthing = "three";
}
```

I also quite like the clearly marked conditional block. When reading the code I can look at the condition, see it's not relevant to what I'm working on and ignore the entire block.

Of course if you have lots of properties that need to be set based on different conditions this will get much more verbose, so the conditional spread version might be a better choice then. As always, context is important.
