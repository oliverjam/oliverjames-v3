---
title: "A complete guide to making web pages from scratch"
date: 2019-11-07T12:15:00Z
tags: ["html", "web", "learn", "fundamentals"]
---

It can feel confusing when you're first learning to code for the web. You can get pretty good at HTML, CSS & JavaScript in isolation (using online tools like [freeCodeCamp](https://freecodecamp.org), [CodePen](https://codepen.io) and [repl.it](https://repl.it)) but struggle to put all the pieces together and create an entire web page on your own.

<!-- excerpt -->

I'm going to explain all the required bits you need to get a functioning page, using nothing but a text editor.

## Before you start

I'm assuming you're working on a desktop computer or laptop. Whilst it is possible to code on a smartphone or tablet it will be much more difficult to set up.

You'll need a program for editing text (ideally one designed for writing code). I'd recommend [VS Code](https://code.visualstudio.com/) from Microsoft. It's free, cross-platform and has good defaults.

In order to view your web page you'll also need a web browser. [Firefox](https://www.mozilla.org/en-GB/firefox/new/) and [Chrome](https://www.google.com/chrome/) are both great, and have good developer tools built in.

## How the web works

Imagine you click a link to google.com. Your browser connects to Google's remote computer (usually called a server). It knows where to go using a system called DNS (like an address book for domains).

Your browser asks the server for a response to show. The server sends back an HTML file representing the Google homepage. Since your browser understands HTML it can display the text, images and other elements that make up the web page.

This is a very simplified explanation; if you want to know more detail try [this MDN article about the web](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works).

## The language of the web

HTML, or _HyperText Markup Language_, is the language of the web. An HTML file is the entrypoint for all web pages—no other type of file will work. For example if you click a link to a `.js` file the browser will just display the raw text content rather than actually running any code.

So we need to create an HTML file that our browser understands. If you want to follow along create a folder called `my-webpage` anywhere on your computer (the Desktop is fine). Then create a file called `index.html` inside the folder and open it in your text editor. This file can be called whatever you like, but `index` is the convention for the homepage of a website.

## A minimal HTML page

Let's create a "minimum viable" HTML page—just the stuff we need to get it to load in a browser.

An HTML file has a specific structure that you have to follow.

### The doctype

First you have to tell the browser that this file is actually HTML (and what version of the HTML syntax it's using).

```html
<!DOCTYPE html>
```

This tells the browser that this is a modern HTML5 document and should always appear at the top of the file.

### The root element

Next we should have a root element. This contains everything else in the HTML document—there should be nothing outside this except the doctype.

```html
<!DOCTYPE html>
<html></html>
```

### The head element

The `<head>` contains stuff that should be included in the document but won't show up on the page. This means metadata about the page, external assets like CSS files etc.

```html
<!DOCTYPE html>
<html>
  <head></head>
</html>
```

#### Mandatory head elements

There are a couple of things that should always be inside the head.

##### Document encoding

There are lots of different ways computers can display human text, so we need to specify which one we want this page to use. The most useful is [utf-8](https://en.wikipedia.org/wiki/UTF-8), which includes pretty much all characters you'll ever use.

We can set this using the `<meta>` tag. This is a general purpose tag for describing information _about_ the page. You'll see it used for a few other things later too.

<!-- prettier-ignore-start -->
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
</html>
```
<!-- prettier-ignore-end -->

##### The page title

Every web page should have a unique title. This is displayed in the tab in your browser, shown in search results and also read out by screenreaders to identify the page. We can use the `<title>` element for this.

Remember nothing in the head is shown on the page itself—this is only used outside the page.

<!-- prettier-ignore-start -->
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My web page</title>
  </head>
</html>
```
<!-- prettier-ignore-end -->

### The body element

The `<body>` element contains everything you want to appear on the page.

Let's put an `<h1>` inside it so we have a heading we can see.

<!-- prettier-ignore-start -->
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My web page</title>
  </head>
  <body>
    <h1>My web page</h1>
  </body>
</html>
```
<!-- prettier-ignore-wns -->

That's it—if you save the above text in your HTML file you should be able to double-click it to open in your default web browser.

This is how it looks for me in Firefox:

<img src="/assets/media/web-page-basics.png" alt="" width="1060" height="649">

You can keep adding HTML elements inside the `<body>`, saving your file and refreshing the browser to see updates.

## Browser developer tools

Most browsers have good developer tools to help you work on a web page. You can usually open them by pressing <kbd>command</kbd> + <kbd>option</kbd> + <kbd>i</kbd> (on a Mac) or <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>i</kbd> (on Windows). There should be an "Elements" panel where you can see all the HTML in your page, as well as any associated styles.

This is what our page so far looks like in Firefox dev tools:

<img src="/assets/media/web-page-devtools.png" alt="" width="1060" height="649">

## Adding styles

We can now use CSS to style the elements on our page. HTML is an interesting language because it can actually include CSS and JS inside it. There are two ways to add styles.

### Inline styles

The simplest way to add some styles is with the `<style>` element. This usually goes inside the head.

<!-- prettier-ignore-start -->
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My web page</title>
    <style>
      h1 {
        color: firebrick;
      }
    </style>
  </head>
  <body>
    <h1>My web page</h1>
  </body>
</html>
```
<!-- prettier-ignore-end -->

If you add the style tag, save and refresh your browser you should see the heading turn dark red.

Open the developer tools again and select our `<h1>` in the "Elements tab". You should see the CSS rule applied. You can edit, add or remove CSS here temporarily to play around with things before adding code to your actual file.

<img src="/assets/media/web-page-devtools-styles.png" alt="" width="1060" height="649">

### External CSS files

We can also include a separate `.css` file. You may want to do this if you have lots of styles that are making your HTML file too big. You can also share a separate CSS file across multiple pages.

Create a new file called `my-styles.css` and copy the inline styles from above into it.

The `<link>` tag lets us include other resources in our page. We need to specify the type of resource and its URL:

<!-- prettier-ignore -->
```html
<link rel="stylesheet" href="/my-styles.css">
```

Replace the style tag in your document's head with that link tag, then save and refresh. Your styles should still be applied.

## Adding interaction

HTML supports a limited amount of interactivity, mostly via form elements. If we want our page to have more complex behaviour we need to add JavaScript. There are also two ways to do this.

### Inline JS

We can use the `<script>` tag to add inline JavaScript to our page. This tag can contain JS-language code within our HTML in the same way the `<style>` tag contains CSS-language code.

```html
<script>
  console.log("JavaScript is working!");
</script>
```

You _can_ put this in the `<head>`, but unlike CSS it's usually a good idea to put JS at the bottom of the `<body>`. This way all the rest of your content is loaded before you try to run any JS.

<!-- prettier-ignore-start -->
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My web page</title>
    <link rel="stylesheet" href="/my-styles.css">
  </head>
  <body>
    <h1>My web page</h1>
    <script>
      console.log("JavaScript is working!");
    </script>
  </body>
</html>
```
<!-- prettier-ignore-end -->

Open the developer tools, then click the "Console" tab and you should see our "JavaScript is working!" message.

<img src="/assets/media/web-page-devtools-js.png" alt="" width="1060" height="649">

### External JS files

We might want to move our JS to an external file for the same reasons we would move our CSS. Create a new file called `my-script.js` and copy in our `console.log` line from above.

Confusingly we _don't_ use the link tag for this—we use the same script tag, but with the `src` attribute to point to the URL of our JS file:

```html
<script src="/my-script.js"></script>
```

Note that you need the closing `</script>` tag even though there's nothing inside it.

Replace the script tag in your html with the new one, save and refresh. You should still see the message logged to your browser console.

## Nice extras

That's pretty much everything that's absolutely needed to make a functioning web page. However there are a few extra things that most web pages have that aren't _required_, but make the experience better for users.

### Specify a language

It's a good idea to tell the browser what language the page content is in. This helps your page appear in language-specific search results, allows browser translation tools to offer translation for users with a different language set, and sets the correct voice/accent for screenreaders.

Generally we set the language once on the root element:

```html
<html lang="en"></html>
```

If you have parts of your site in another language you can set the attribute there too, and it will override the site-level language for just that element:

```html
<blockquote>
  <p lang="de">Ich bin ein Berliner</p>
  <cite>President John F. Kennedy</cite>
</blockquote>
```

### The viewport meta tag

The [viewport meta tag](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag) is used to tell mobile browsers that your page is mobile-optimised.

In the early days of the mobile web most sites were built exclusively for big screens, so mobile browsers would zoom the page out to let the user see everything at once. Nowadays a [responsive site](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) should display correctly on a small screen, so we can use this viewport meta tag to opt-out of the default zooming behaviour.

<!-- prettier-ignore -->
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### A favicon

A favicon is the little icon that appears in the tab next to the site title (and in some other places). This helps users identify your site and can add a nice design touch.

You'll need a `favicon.ico` file. If you don't want to make your own you can [download mine here](/favicon.ico) (right click the link and save), then copy it into your website folder.

We include this file with a link tag in the `<head>`, just like CSS files.

<!-- prettier-ignore -->
```html
<link rel="icon" href="/favicon.ico">
```

Some browsers will automatically request and use a file named `favicon.ico` if they find one, but it's best to be explicit. There are lots of different formats for larger icons and different platforms, so it's best to use [a favicon generator](https://realfavicongenerator.net) to create all the files you might need.

### The meta description tag

It's useful to provide a description of your page and its content. This will be shown by search engines along with the page title, so users have an idea of what the page is about before they visit it.

<!-- prettier-ignore -->
```html
<meta name="description" content="My web page is a playground for me to learn about web concepts">
```

The description should be 120-150 characters to avoid being cut-off in Google search results.

## Wrapping up

For completeness here's a full code sample of everything a web page needs to get started:

<!-- prettier-ignore-start -->
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My web page</title>
    <link rel="icon" href="/favicon.ico">
    <link rel="stylesheet" href="/my-styles.css">
    <meta name="description" content="My web page is a playground for me to learn about web concepts">
  </head>
  <body>
    <h1>My web page</h1>
    <script src="/my-script.js"></script>
  </body>
</html>
```
<!-- prettier-ignore-end -->

Hopefully now you have some understanding of what each of these tags does, and why we should include them.

If you feel comfortable building static web pages and want to learn how to add interactivity with JavaScript I'd recommend my [Introduction to the DOM](/blog/dom-intro/) article next.
