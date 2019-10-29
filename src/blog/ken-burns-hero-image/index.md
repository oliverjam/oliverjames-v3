---
title: How to create a Ken Burns hero image effect
date: 2016-11-16T22:40:32.169Z
tags: ["css", "js", "animation", "ken burns", "keyframes"]
---

[Lick] are a shopper marketing agency with a strong focus on creative design, which meant their site needed to be visual-heavy. They wanted the top of the homepage to communicate this, whilst also subtly nodding to some of the big brands the agency works with.

<!-- excerpt -->

## The design process

The first iteration of this hero area featured several looping videos, but we quickly ran into performance issues. There was no way to get multiple videos at a high enough quality to do justice to Lick's work without forcing users to download unfeasibly large files. We also struggled to provide a good user experience for mobile browsers that either refused to autoplay video or forced the video to display inline.

I suggested we instead try using still images with a [Ken Burns] style pan and zoom animation using <abbr title="cascading style sheets">css</abbr>. Using optimised jpegs allowed file sizes to stay manageable and <abbr>CSS</abbr> transforms gave a nice sense of motion without stressing the browser too much. As a bonus this even worked perfectly on mobile.

We deliberately chose stock imagery as we found that showing actual work on the frontpage of the previous site needed updating constantly to stop the page from looking stale. Using high quality stock imagery that subtly referred to some of Lick's clients (grass for Spurs, paint for Wilko etc).

## The code

The basic idea here is to absolutely position a 'stack' of images within a container, animate the image to zoom in and move across, then fade out the top image and move it to the bottom of the stack and repeat.

### HTML

We need a full viewport container with some images.

```html
<div class="hero" id="js-hero">
  <img class="hero__image js-animating" src="image1.jpg" />
  <img class="hero__image" src="image2.jpg" />
  <img class="hero__image" src="image3.jpg" />
</div>
```

The `js-hero` <abbr title="identifier">ID</abbr> will be used to target the container later. The `js-animating` class will be used to apply the <abbr>CSS</abbr> animations. The first image starts with this class applied to ensure it animates as soon as it loads, without waiting for the javascript to download and execute. This also provides a graceful degradation for users without JavaScript — they still see a single image animate.

### CSS

```css
.hero {
  position: relative;
  min-height: 600px;
  min-height: 100vh;
  overflow: hidden;
}

.hero__image {
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  transform-origin: top left;
  opacity: 0;
  will-change: opacity, transform;
}

.hero__image:nth-child(2n) {
  transform-origin: top right;
}

.hero__image:nth-child(3n) {
  transform-origin: bottom right;
}
```

The container is set to be at least as tall as the viewport (with a fallback for browsers that [don't support viewport units]), and has its overflow hidden so the images within don't spill out when zoomed by the animation.

The images are positioned absolutely within the container with a minimum width and height of 100%, ensuring they fill the container at any aspect ratio. This means the image will crop when the window is resized, so consider using the [picture element] to specify different image files at different window widths.

Each image has a different corner set as its transform-origin. This is so we can apply the same <abbr>CSS</abbr> animation later on but have each image look as if it's moving in a different direction.

We also set the opacity to 0, allowing our animation to fade the pictures in, and we tell the browser to expect these elements to change opacity and transform (using the new [will-change] property). This can help with performance and is an official version of the old transform3d hack to force <abbr title="graphics processing unit">GPU</abbr> rendering.

### Animation

```css
.js-animating {
  animation: fade 3s forwards, zoom 15s linear forwards;
}

.js-animating:first-child + img ~ img {
  z-index: -1;
}

@keyframes fade {
  100% {
    opacity: 1;
  }
}

@keyframes zoom {
  100% {
    transform: scale(1.2);
  }
}
```

Here we describe two animations, 'fade' and 'zoom'. The first will fade an image in and the second will increase an image to 120% of its original size.

The `js-animating` class sets both of these animations (using the [animation shorthand]). The fade is relatively short, as we want the new image to fade in and be visible for most of the animation, whilst the zoom is long so the image keeps slowly moving throughout.

Zoom has its `animation-timing-function` set to linear as I found any easing here looks strange (Ken Burns effects tend to have a consistent pan speed). Finally both have their `animation-direction` set to forwards to ensure they stay in their final frame state (rather than snapping back to how they started).

### Javascript

```js
const hero = document.getElementById("js-hero");
const heroImages = hero.querySelectorAll(".hero__image");
const numberOfImages = heroImages.length;
let i = 1;

function kenBurns() {
  if (i === numberOfImages) i = 0;
  heroImages[i].classList.add("js-animating");
  if (i === 0) heroImages[numberOfImages - 2].classList.remove("js-animating");
  if (i === 1) heroImages[numberOfImages - 1].classList.remove("js-animating");
  if (i > 1) heroImages[i - 2].classList.remove("js-animating");
  i++;
}
window.setInterval(kenBurns, 6000);
```

This is where the magic happens. We first select our container, then our nodelist of images. We also need the total number of images, `numberOfImages` and a counter variable `i`, which is initially 1.

The `kenBurns()` function does the actual work. It checks whether the counter is equal to the total number of images, and resets the counter to zero if so. This is so the first image is shown again after the loop has finished.

The function then adds the `js-animating` class to the second image (at index 1 in the nodelist). We then need to make sure the animating class is removed from not the previous image but the one before that. Otherwise we wouldn't get the nice fade out to the next image.

The next three lines of code make this happen — when the counter is at zero `js-animating` is removed from the second last image in the stack, which lets the final image fade out as the first image fades back in. When the counter is equal to one the animating class is removed from the final image in the stack, and for any other value of the counter the class is removed from the image before the previous one.

(I'm aware this logic is convoluted, but I can't think of a way of improving on this. As long as it works…)

We then increment the counter variable by one so that the next image is shown each time the function runs.

The function is run by setting an interval. The time in milliseconds here determines how long each iteration of the function will last (and therefore how long each image will get to animate). This takes a little playing with to get the exact effect you're looking for.

[lick]: http://www.lickcreative.com
[ken burns]: http://en.wikipedia.org/wiki/Ken_Burns_effect
[don't support viewport units]: http://caniuse.com/#feat=viewport-units
[will-change]: https://developer.mozilla.org/en/docs/Web/CSS/will-change
[picture element]: https://developer.mozilla.org/en/docs/Web/HTML/Element/picture
[animation shorthand]: https://css-tricks.com/snippets/css/keyframe-animation-syntax/
