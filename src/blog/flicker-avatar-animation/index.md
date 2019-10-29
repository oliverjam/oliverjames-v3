---
title: Create a flickering image effect using CSS sprites
date: 2016-12-01T22:40:32.169Z
tags: ["css", "animation", "sprite", "keyframes"]
---

I just added a flickering faux-motion effect avatar to my About page. The technique behind it is fun (and requires relatively little code).

<!-- excerpt -->

[Primitive] came to my attention a while ago as a nice tool for creating vectorised images. I was enamoured with the flickering effect achieved by animating between multiple versions of the same photo (Primitive produces different versions each time it is run).

## Animation

There are a few different ways to achieve this effect — the Primitive pencil example uses JavaScript to repeatedly switch each image from `display: none` to `display: block` in order. I felt like this would be a perfect case to experiment with <abbr title="cascading style sheets">CSS</abbr> sprite animation.

Sprite animation is similar to a flipbook: you create a 'sprite' (a long image containing each frame of your animation) and then use <abbr>CSS</abbr> keyframes to animate along this image.

The tricks to get it working are putting the sprite in a container the size of a single frame (so only one frame is visible at a time), and using `steps()` as your `animation-timing-function`.

## Steps

By default keyframe animations tween between each frame to create smooth motion. In this case however this ruins the effect:

<style>
@keyframes slide {
  to {
    transform: translateX(-100%);
  }
}

.stage__image {
  animation-name: slide;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  margin: 0;
  max-width: none;
}

.steps {
  animation-timing-function: steps(3);
}

.final {
  animation-duration: 0.25s;
}

.stage {
  margin-left: auto;
  margin-right: auto;
  width: 256px;
  height: 256px;
  border: 0.25rem solid;
  transform: translate3D(0, 0, 0);
}

.stage--final {
  border-radius: 50%;
  overflow: hidden;
}

</style>

<div class="stage">
  <img
    class="stage__image"
    src="/assets/media/profile-pic.jpg"
    alt=""
  >
</div>

We want the animation to jump from frame to frame, giving the illusion of animation. The `steps()` function can be confusing (especially if you don't know that it takes an optional second value of 'start' or 'end'). [This article] explains better than I could how it works, but for this particular purpose we can just set set the same number of steps as frames in our sprite.

<div class="stage">
  <img
    class="stage__image steps"
    src="/assets/media/profile-pic.jpg"
    alt=""
  >
</div>

## The sprite

I generated three different versions of the same image using the [JavaScript fork of Primitive] and then stitched them together in Preview. This in itself was a bit of a hassle as you can't change the canvas size without also resizing the image. You need to select all, cut the image, adjust image size to 300% width, then re-paste the first image and move to the left edge. You can then cut and paste the next two images alongside the first to fill the remaining space.

![three slightly different versions of my face](./profile-sprite.png)

## The code

Once you've got your sprite you can start writing code. We need a container to hide the extra frames. One downside to this technique is that it requires a specific size to be set on the container — the size of a single frame of your sprite.

```html
<div class="sprite">
  <img
    class="sprite__img"
    src="/assets/media/sprite.png"
    alt="An animated avatar of Oli"
  />
</div>
```

```css
.sprite {
  width: 256px;
  height: 256px;
  overflow: hidden;
}
```

We then need to animate the image within the container. The below code will move the sprite its full length to the left every 0.3s, but in 3 discrete steps (moving 33% of its length each step). This means each frame of the sprite is displayed for 0.1s before jumping to the next one.

```css
.sprite__img {
  animation: flicker 0.25s steps(3) infinite;
}

@keyframes flicker {
  to {
    transform: translateX(-100%);
  }
}
```

## Border-radius bug

I wanted my avatar to be circular rather than square, so I put `border-radius: 50%` on the containing `div`. This was fine until I added the animation, which apparently triggered a [long-standing bug in Chrome] causing animated children to overflow their containers (something to do with Chrome promoting the animated element to a new layer for performance).

You can solve this by also promoting the parent element to a new layer with `transform: translate3D(0, 0, 0)`. So the final <abbr>CSS</abbr> looks like this:

```css
.sprite {
  width: 256px;
  height: 256px;
  overflow: hidden;
  border-radius: 50%;
  transform: translate3D(0, 0, 0);
}

.sprite__img {
  animation: flicker 0.25s steps(3) infinite;
}

@keyframes flicker {
  to {
    transform: translateX(-100%);
  }
}
```

And here's the end result:

<div class="stage stage--final">
  <img
    class="stage__image steps final"
    src="/assets/media/sprite.png"
    alt=""
  >
</div>

[my about page]: "/about"
[primitive]: "https://github.com/fogleman/primitive"
[this article]: "https://designmodo.com/steps-css-animations/"
[javascript fork of primitive]: "https://ondras.github.io/primitive.js/"
[long-standing bug in chrome]: "https://bugs.chromium.org/p/chromium/issues/detail?id=157218"
