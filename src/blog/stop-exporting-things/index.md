---
title: Stop exporting things, I'm begging you
date: 2019-08-22T15:00:00Z
tags: ["js", "react", "eslint", "modules"]
---

I honestly believe the "one component per file" ESLint rule ([`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md)) is the smallest thing with the most negative impact on React codebases I've worked in.

<!-- excerpt -->

Even if you aren't using this rule yourself it seems to have spread its sinister tentacles out into the brains of the community. In my experience most people default to creating a new file whenever they need a new component.

I think this is a bad default.

## Modules are modules, not organisers

Most people seem to think of ES Modules as a mechanism for modularising and organising their code. Whilst they _are_ useful for this, I'd argue that the clue is in the name: they're _modules_. They're designed to divide your code up into isolated scopes. Importing and exporting allow things to cross that boundary.

This means you can consider anything exported from a module part of the "public API" for that file.

## Big render methods are fine

JSX is pretty readable. The closing tags make large trees easier to follow (unlike nested function calls/objects that just have anonymous closing brackets).

Try only splitting an element out into a new component when there's complex conditional rendering logic or lots of stuff that needs to be defined outside of the JSX (e.g. hooks).

### Say no to weird render functions

A weird common pattern that has presumably emerged to counter the over-zealous ESLint rule is the `renderThing()` method. Someone will decide their JSX is getting a bit long and create a helper function that returns a chunk of it.

```jsx
export default class BigThing extends React.Component {
  renderSomeStuff() {
    return <div>Imagine this was longer</div>;
  }
  render() {
    return <div>{this.renderSomeStuff()}</div>;
  }
}
```

This is like a bastardised pseudo-component. It's a function that returns a React element, but it doesn't take props and can't be rendered using JSX. It's also usually defined _before_ the render method, so you end up reading some random child elements out of context before you know where they go in the parent.

I honestly can't see any reason to use this pattern over a simple function component. A component can use hooks, can be memoised, is more idiomatic React—the framework gives you a specific way for modularising your render, so why not use it?

## Keep related components in the same file

If you do need to split a chunk of your render out into another component, start out with it in the same file. This is less effort than creating a whole new file and means the new component already has access to everything in scope in the current module.

If you've got a few "child" components in one file I find it can be useful to define them below the "main" exported component and rely on hoisting to ensure they're available at the top. That way someone opening the file sees the most important thing first, and can go read the smaller components when they encounter them in the main render method.

```jsx
export default function BigThing() {
  return (
    <div>
      <SmallPart />
    </div>
  );
}

function SmallPart() {
  return <div>Imagine this was longer</div>;
}
```

## Share when you need to

Sharing code always comes with overhead. Once something is in its own file and exported you have to maintain that. Who knows what other dark corners of the codebase are depending on it after some time passes. Are you sure it's safe to tweak, or refactor, or even delete?

If you definitely need a component in another place then it might be time to extract it to a new file. I would resist this until it's really obvious that you need it though.

If the component needs to be a bit different in the second place just copy/paste it and tweak the copied version. Making reusable components that fit lots of use-cases is _hard_—most of the time you just end up with a franken-component that takes forty props and renders a totally different set of JSX for each one.

If you definitely, truly, need the exact same component in another place then sure, move it to its own file and export it. Just be aware that you've now committed to maintaining this as something that could hypothetically be used all over the codebase.
