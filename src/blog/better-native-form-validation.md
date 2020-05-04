---
title: Better native form validation
date: 2020-05-04T12:50:00.000Z
tags: ["html", "validation", "accessibility"]
---

All but the simplest forms need some validation to help users enter the right information. I usually want slightly more control than native HTML5 validation, but without re-implementing everything in JavaScript. I recently discovered a great technique for enhancing the browser's built-in validation.

<!-- excerpt -->

## Quick summary

If you just want the code here's [the final CodePen](https://codepen.io/oliverjam/pen/eYpGwEG). I turn off default validation with the form's `novalidate` attribute, then manually validate all fields with `form.checkValidity()`. This triggers an `invalid` event on each field, allowing me to mark each field as invalid and show the default browser validation message in a div.

## Native isn't always better

I sometimes catch myself assuming that if the browser implemented it a feature must be usable/accessible/performant etc. Unfortunately this is not always the case. Whilst defaulting to built-in semantic HTML elements is usually a good idea, there are plenty of cases where this will let you down.

Dave Rupert recently [documented lots of cases of innaccessible HTML](https://daverupert.com/2020/02/html-the-inaccessible-parts/). This is heartbreaking as someone who cares about and advocates for accessibility.

The same problem applies to native form validation. Adrian Roselli [highlights several WCAG violations](https://adrianroselli.com/2019/02/avoid-default-field-validation.html) with the default browser behaviour.

Here is an incomplete list of problems:

1. Some screen reader + browser combinations do not read out the validation message.
1. `required` inputs are immediately announced as "invalid" before the user has tried to enter information.
1. Default error indicators generally rely only on a coloured outline.
1. We cannot style the validation message "bubble".

Let's see if we can do better.

## Validation goals

I set out with a specific set of goals:

1. Keep using HTML5 validation attributes (`required`, `minLength`, `pattern` etc).
1. Don't re-implement stuff HTML5 attributes can do for us (no unnecessary JS).
1. Default to using the browser's validation messages, but override with my own where needed.
1. Add my own DOM elements containing validation messages so I can style them and expose them to assistive tech.

It turns out the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) provides all the tools we need.

## Constraint Validation

This API provides access to and control of all the native validation features, but via JavaScript.

### Validity state

The browser exposes the "validity state" of an input via the `inputElement.validity` property. The [ValidityState interface](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) has properties for each possible native validation error. It looks like this:

```js
ValidityState {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: true,
  valueMissing: false
}
```

Only one of these properties can be true at a time. When the browser validates a field it will flip the property for the first constraint failure to `true`. If the input has no constraint failures the `valid` property will be set to true.

I'm not sure where the order comes from, but `valueMissing` appears to always come first. I guess there's no point validating more specific constraints when the user hasn't typed anything yet.

### Preventing default validation

If we're going to implement our own validation we should stop the browser defaults showing up. We can do this by adding the `novalidate` attribute to the form element.

```js
const form = document.querySelector("form");
form.setAttribute("novalidate", ""); // boolean attributes don't need a value
```

Now the browser will allow a form containing invalid values to be submitted, so we need to stop that happening.

### Triggering validation

By default the browser validates all fields within a form when that form is submitted. We can mimic that behaviour with an onsubmit handler that calls [`formElement.checkValidity`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement#Methods). This method will validate each field within the form and return `true` if there were no failures or `false` if any input is invalid.

Since the form should not submit with invalid values we can call `event.preventDefault` if we receive a false value.

```js
form.addEventListener("submit", (event) => {
  const allValid = form.checkValidity();
  if (!allValid) {
    event.preventDefault();
  }
});
```

### Detecting invalid fields

This is my favourite part. I always assumed I had to manually loop through all the fields and figure out which ones were invalid. I recently discovered that's not the case: the browser fires ["invalid" events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) on each input that is validated and has a constraint failure.

We can add access each field in our form using [`form.elements`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements), then attach an oninvalid listener to each.

```js
const fields = Array.from(form.elements);
fields.forEach((field) => {
  field.addEventListener("invalid", () => {
    console.log(field.validity);
  });
});
```

Now when we submit our form and call `checkValidity` all invalid fields should log their validity state.

### Validation messages

We want to put an element in the DOM containing a validation message for each invalid field. This element should be associated with the input so that its content is part of the input's [accessible name](https://developer.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/).

That way when an assitive tech user focuses the input the validation message will be read out after the label. Scott O'Hara has a great guide on [using the `aria-describedby` attribute](https://developer.paciellogroup.com/blog/2018/09/describing-aria-describedby/) to provide additional information about form fields.

Our final markup should look something like this:

```html
<label for="email">
  Email
  <span aria-hidden="true">*</span>
</label>
<input type="email" id="email" aria-describedby="emailError" required />
<div id="emailError"></div>
```

Since we're currently just replicating the built-in validation we should re-use the message the browser provides. We can get this from the `inputElement.validationMessage` property.

We're _enhancing_ the native browser validation here, so we should add the message element with JS. That way any user whose JS doesn't run will just get the normal slightly-less-good HTML5 validation.

```js
fields.forEach((field) => {
  const errorBox = document.createElement("div");
  const errorId = field.id + "Error";
  errorBox.setAttribute("id", errorId);
  field.setAttribute("aria-describedby", errorId);
  field.insertAdjacentElement("afterend", errorBox);

  field.addEventListener("invalid", () => {
    errorBox.textContent = field.validationMessage;
    // e.g. "Please fill out this field"
  });
});
```

### Communicating validity

We now have a functioning replica of the default validation. However there's no indication that a given field is invalid (other than the message appearing). We need to communicate this both visually and programmatically. It's usually a good idea to tie these things together so that the visual styles depend on the right programmatic attributes being set.

In this case we should set `aria-invalid="true"` for any field that fails validation. We should _also_ set `aria-invalid="false"` on all the fields before they are validated. That way fields aren't invalid before the user has had a chance to enter any information.

```js
fields.forEach((field) => {
  field.setAttribute("aria-invalid", false);
  // ...

  field.addEventListener("invalid", () => {
    // ...
    field.setAttribute("aria-invalid", true);
  });
});
```

We can now use this ARIA attribute as a styling hook:

```css
[aria-invalid="true"] {
  border-color: firebrick;
}
```

You'll probably want more complex styles than this to make sure all types of field are correctly highlighted as invalid. E.g. it might be nice to show some kind of warning icon next to the field.

### Fixing errors

Currently the field will never be marked as valid again. Even if the user fixes their entry the field will still have `aria-invalid="true'` and a visible error message. We can handle this in two ways: either re-validate as they type, or mark the field as valid as soon as the user changes it.

#### Clear errors

We can add an [oninput](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event) handler that marks the field as valid again whenever the user changes the value.

```js
fields.forEach((field) => {
  //...
  field.addEventListener("input", () => {
    field.setAttribute("aria-invalid", false);
    errorBox.textContent = "";
  });
});
```

Now as soon as the user edits the field it is marked as valid. It will get re-validated when the form is submitted, as before.

#### Re-validating

The browser re-validates invalid fields when the user types into them. This gives the user immediate feedback when they're trying to correct an invalid field. However I tend to think a constantly updating error beneath an input is distracting, so this might be something that you need to user test.

Form fields also have a `checkValidity` method. This behaves just like the form element's method, except it only triggers validation for this single field.

We check its validity, which will trigger an `invalid` event that updates the message if the field is invalid. If the field _is_ valid we mark the input as valid and remove the error message.

```js
fields.forEach((field) => {
  //...
  field.addEventListener("input", () => {
    const valid = field.checkValidity();
    if (valid) {
      field.setAttribute("aria-invalid", false);
      errorBox.textContent = "";
    }
  });
});
```

### Validating before submit

This is optional but it can be helpful to validate a field as soon as the user is done filling it in. That way the user can immediately fix the error rather than filling out the entire form and attempting to submit before they know they made a mistake.

We can add an [onblur](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) listener that will fire when the user's focus leaves the field.

```js
fields.forEach((field) => {
  //...
  field.addEventListener("blur", () => {
    field.checkValidity();
  });
});
```

### Custom messages

Some of the built-in browser validation messages are unhelpful or confusing. It would be nice if we could override this for certain fields/validation states. We can write a `getMessage` function that checks the field's `validity` property and returns custom message string.

```js
field.addEventListener("invalid", () => {
  const message = getMessage(field);
  errorBox.textContent = message || field.validationMessage;
});

function getMessage(field) {
  const validity = field.validity;
  if (validity.valueMissing) return `Please enter your ${field.id}`;
  if (validity.typeMismatch) return `Please enter a valid ${field.type}`;
}
```

You can create the messages however you like: dynamically using the element properties like this, or look them up in a big object where you define every single possible error for every input.

It's worth highlighting that the browser's default messages are translated, so make sure yours are too if you have a localised application.

<!-- ### Custom validation

So far we've relied entirely on validation that can be achieved using HTML5 validation attributes. Sometimes these aren't enough, however, and we need to write custom JS logic to determine if a field is invalid.

Fortunately since we've hooked into the native Constraint Validation API we don't have to do anything special here. Form fields have a `setCustomValidity` method that takes a string argument. If the string is empty the field is marked valid, otherwise the field is marked invalid and the string is used as the validation message.

Here's a simple attempt to validate that the user entered a date:

```html
<label for="dateOfBirth">Date of birth</label>
<input type="text" id="dateOfBirth" placeholder="dd/mm/yyyy" required />

<script>
  dateOfBirth.addEventListener("blur", () => {
    const date = new Date(dateOfBirth.value);
    if (date.toString() === "Invalid Date") {
      dateOfBirth.setCustomValidity("Please enter a valid date");
    } else {
      dateOfBirth.setCustomValidity("");
    }
  });
</script>
```

Your logic can get as complex as you like here, all that matters is that you call `setCustomValidity`. The constraint validation code we already wrote will handle all the rest. -->

## Conclusion

You can play around with the final version in [my CodePen example](https://codepen.io/oliverjam/pen/eYpGwEG). It's not _too_ much code, and since it's pretty generic you can copy/paste it for any form you like. Hopefully you'll go forth and write more usable and accessible forms 🚀.
