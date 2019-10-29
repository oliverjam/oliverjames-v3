---
title: Introduction to Redux
date: 2019-02-22T12:00:00Z
tags: ["js", "react", "redux", "learn"]
---

Redux attempts to make state changes predictable by restricting how and when they happen. It separates your state management code from your UI code.

<!-- excerpt -->

## Principles

Redux has three [Principles](https://redux.js.org/introduction/three-principles):

1. Your state has a single source of truth (one top-level object)
2. Your state is read-only (can only be updated by dispatching actions)
3. Your state is only altered by pure functions

These principles are designed to help state management remain predictable even as an app or team grows much larger.

## Core Concepts

### State

Your single source of truth for state is by convention called the "store". This store is usually structured as an object.

```javascript
const store = {
  todos: [
    { id: 1234, text: "Do a thing", done: true },
    { id: 1235, text: "Do another thing", done: false },
  ],
  showDone: true,
};
```

### Actions

You describe updates to this store using "actions". An action is an object with a `type` property that describes what kind of update it is.

```javascript
const ADD_TODO = { type: "ADD_TODO" };
```

Actions can optionally contain other properties with data necessary for the update:

```javascript
const ADD_TODO = { type: "ADD_TODO", text: "Do a third thing" };
```

Your application can fire these actions using the `dispatch` function. This is provided by Redux, as we'll see shortly.

```javascript
dispatch({ type: "ADD_TODO", text: "Do a third thing" });
```

### Reducers

A reducer is a function that is called every time an action is dispatched. It receives the current state and the dispatched action as arguments, and returns the updated state.

The simplest possible reducer would receive no actions and always return the state unchanged:

```javascript
const initialState = {
  todos: [],
  showDone: true,
};

function reducer(state = initialState, action) {
  return state;
}
```

We default the `state` argument to whatever we want our initial state to be so that the first time the reducer runs it returns the state in the shape we want.

Reducers are the only way to alter your state in Redux, which means all possible state updates are in one place.

By convention reducers usually use `switch` statements to handle different action types.

```javascript
function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo = { id: Date.now(), text: action.text, done: false };
      const newTodos = [...state.todos, newTodo];
      return { ...state, todos: newTodos };
    }
    case "CLEAR_TODOS":
      return { ...state, todos: [] };
    default:
      return state;
  }
}
```

Since the reducer is supposed to be pure you should always return a _new copy_ of the state, rather than mutating the old value. The spread operator helps a lot with this.

Reducers should also return the state unchanged if no valid action type is dispatched (the default case).

## Usage

These concepts come together with a a helper method from Redux: `createStore()`. We pass this our reducer and it returns our store.

```javascript
import { createStore } from "redux";

const initialState = {
  //...
};

function reducer(state = initialState, action) {
  //...
}

const store = createStore(reducer);
```

We can now dispatch actions from the store to update our state:

```javascript
store.dispatch({ type: "ADD_TODO", text: "Do a thing" });
store.getState();
// {
//   todos: [
//     { id: 123, text: "Do a thing", done: false }
//   ],
//   showDone: true
// }
```

It's important to note that we've only used one method from the base Redux package. This store can be used with any UI code you like. For example:

```html
<form id="add-todo">
  <label for="add">Add todo</label> <input id="add" name="todoText" />
  <button>Add +</button>
</form>
```

```javascript
//...
const store = createStore(reducer);

const form = document.querySelector("#add-todo");
form.addEventListener("submit", event => {
  const text = event.target.elements.addTodo.value;
  dispatch({ type: "ADD_TODO", text });
});
```

### Vanilla JS Example

Putting together the examples gives us a relatively functional todo app: [https://codesandbox.io/s/qq293xpvx4](https://codesandbox.io/s/qq293xpvx4)

## Complexity

You may be thinking that the Redux code you've seen in the wild is much more complex than this. This is because there are some common patterns (or boilerplate) that are used to ensure consistency in larger apps. These aren't required to use Redux and may even make an app unnecessarily complex if embraced too quickly.

### Type Constants

Since action types are just strings it's easy to mistype them or use the wrong value. It's common to use variables to represent these types so they can be shared across different files.

```javascript
export const ADD_TODO = "ADD_TODO";
```

### Action Creators

It's quite common to create your actions using small functions, rather than constructing the objects manually. Similar to using type constants, this centralises this logic and prevents mistakes.

```javascript
import { ADD_TODO } from "./constants";

const addTodo = text => {
  return { type: ADD_TODO, text };
};

store.dispatch(addTodo("Do a thing"));
```

### Multiple Reducers

As an app gets more complex you may find it difficult to manage all of your state in one huge object. Your reducer might be doing a lot of unnecessary work just ensuring that it duplicates every field when returning state (`return {...state, todos: [...state.todos], other: {...state.other, nested: ...state.other.nested }}` etc).

Redux gives you the ability to break your state up into logical chunks, with a reducer for each one. Since `createStore()` expects a single reducer argument we must combine our separate reducer with `combineReducers()` before creating our store:

```javascript
import { combineReducers, createStore } from "redux";
import { reducer1, reducer2 } from "./reducers";

const reducer = combineReducers({ reducer1, reducer2 });
const store = createStore(reducer);
```

## Usage with React

The `react-redux` package provides some useful abstractions for managing your Redux store and connecting your components to it so they can access the state (and re-render when it changes).

Using Redux with React requires understanding a few extra React-specific concepts.

### Concepts

#### Context

Usually React app data (state and props) flows down through the component tree, passed to children as props. React provides a way to bypass this "prop-drilling" and make data available anywhere in the tree: [context](https://reactjs.org/docs/context.html).

Having a global single source of truth for your state is a core principle of Redux. So it makes sense to provide this state to your components via context.

##### Context Provider

The `<Provider>` component wraps your entire component tree and "provides" the store via context.

```jsx
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div>Hello world</div>
    </Provider>
  );
}
```

### Accessing State

Your state is now available anywhere in your component tree—but how do you access it? `react-redux` provides a higher-order component that lets your component grab just the bits of state it needs.

#### Higher-order Components

An HoC is a function that wraps a component and returns a new copy of that component with some extra props added. For example:

```jsx
// add.js
function withAdd(Component) {
  const add = (a, b) => a + b;
  return class extends React.Component {
    add = (a, b) => a + b;
    render() {
      return <Component {...this.props} add={this.add} />;
    }
  };
}

function Test(props) {
  return <div>{props.add(2, 3)}</div>;
}

export default withAdd(Test);
```

```jsx
// index.js
import Add from ""./add";

ReactDOM.render(<Add />, root); // <div>5</div>
```

Since we have exported the _wrapped_ version of `Test` it will have access to the additional `add` prop from `withAdd` whenever we use it, without having to pass the prop ourselves. This isn't very useful here as we could just import `add`, but when combined with context it allows us to have up-to-date access to dynamic values.

#### Connect HoC

`react-redux` provides an HoC called `connect`. This wraps your component, grabs some state from the Redux store context and then passes that state as extra props onto your wrapped component.

#### Accessing State with `connect`

You choose which state you want by passing a function to `connect`. It will call your function with the current state from the store, and expects you to return an object of the props to pass to your component.

This function is usually called `mapStateToProps`. Calling `connect` with `mapStateToProps` returns another function, which you call with your component to inject the state as props.

```jsx
import { connect } from "react-redux";

function Todos({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
  };
};
export default connect(mapStateToProps)(Todos);
```

[Read more about accessing state in the docs.](https://react-redux.js.org/using-react-redux/connect-mapstate)

#### Updating State with `connect`

React components only access the Redux store via `connect`. This means we cannot dispatch actions with `store.dispatch()` as we did before. `connect` will pass `dispatch` to your wrapped component as a prop.

```jsx
import { connect } from "react-redux";

function ClearTodos({ dispatch }) {
  const clear = () => dispatch({ type: "CLEAR_TODOS" });
  return <button onClick={clear}>Clear all todos</button>;
}

export default connect()(Todos);
```

##### `mapDispatchToProps`

You can avoid having to manually dispatch actions like this by providing a second argument to `connect`. This should be a function that takes `dispatch` and returns an object of state updating functions to be passed to your component as props.

```jsx
import { connect } from "react-redux";

function ClearTodos({ clear }) {
  return <button onClick={clear}>Clear all todos</button>;
}

const mapDispatchToProps = dispatch => {
  return {
    clear: () => dispatch({ type: "CLEAR_TODOS" }),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Todos);
// note we explicitly pass nothing as the first argument (mapStateToProps)
// since we don't need to access state
```

If you're using [action creator functions](#Action-Creators) you can pass an object of action creators here, which will automatically have `dispatch` bound to them:

```jsx
import { connect } from "react-redux";
import { clearTodos } from "./actions";

function ClearTodos({ clear }) {
  return <button onClick={clear}>Clear all todos</button>;
}

export default connect(
  null,
  { clear: clearTodos }
)(Todos);
```

[Read more about updating state in the docs.](https://react-redux.js.org/using-react-redux/connect-mapdispatch)

If you're curious you can also check out Dan Abramov's [simplified implementation of `connect`](https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e) to see roughly what it's doing.

### Full React Example

Putting together all our little examples from above gives us a fully functional todo app: [https://codesandbox.io/s/qp3l3zvo6](https://codesandbox.io/s/qp3l3zvo6)
