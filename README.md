# My [previous] personal website

**The new version is available at https://github.com/oliverjam/oliverjames-v4**

This is my personal website, [oliverjam.es](https://oliverjam.es). It's where I experiment with some fun stuff and write blog posts. It is almost certainly over-engineered for the task of turning Markdown into HTML.

## Run locally

If you'd like to run a copy of my site for yourself for some reason...

1. Make sure you have git, Node and npm installed
1. Clone this repo and `cd` into the directory
1. Run `npm install` to install all dependencies
1. Run `npm run dev` to start the dev server

## Tech

The website itself is a collection of static HTML, CSS and JS files. There's no server or anything dynamic. These files are generated at build time by [Eleventy](https://www.11ty.dev/), a static site generator. If you haven't encountered it before Tatiana Mac has a fantastic [intro to Eleventy](https://tatianamac.com/posts/beginner-eleventy-tutorial-parti/) (and static site generators in general).

Eleventy turns any templates in `src/` into HTML pages. This includes all the markdown files in the `src/blog/` directory. If you have built the site you can check the `_site/` directory to see the final structure.

### Deploys

The site is hosted on [Netlify](https://www.netlify.com/). Every time I push to GitHub Netlify automatically rebuilds all the pages and redeploys.

I also have a [GitHub Action](https://github.com/features/actions) (configured in `.github/workflows/main.yml`) that automatically deploys the site every night (at midnight). This ensures everything is reasonably up-to-date (and doesn't cost anything since Eleventy is so fast I'm nowhere near my monthly allowance of free build minutes on Netlify).

### Svelte

Whilst Eleventy supports a whole bunch of nice templating languages out of the box, I decided to make things hard for myself by writing a custom Svelte extension. This allows me to write my pages as [Svelte](https://svelte.dev/) components, complete with scoped CSS in the same file. This also allows me to abstract reusable components into `src/_includes/components/`

You can see the code for the custom extension in `config/plugin-svelte/`. The general idea is that when Eleventy encounters a `.svelte` file it defers to this plugin to generate the HTML for the page. The plugin `require`s the Svelte component, runs it, then returns the resulting HTML and CSS.

I currently don't have a way to "hydrate" Svelte pages so their JS runs client-side too. This means if I need client-side JS I have to manually include a script tag.

## OpenGraph images

In order to get nice image previews when my posts are linked on social media sites I need to include OpenGraph images. I have a couple of horribly hacky scripts in the `sh/` directory for this. `sh/screenshots.js` takes a URL and uses [Puppeteer](https://pptr.dev/) (a "headless" Chrome browser) to open the page, delete everything but the big title, then take a screenshot. `sh/generateOG.js` loops through all the blog posts and takes a screenshot of each, saving them in `src/assets/media/og-image/`. Currently I have to remember to run this manually whenever I write a new post (which isn't that often).

## Analytics

I could not justify invading my visitors' privacy with something as heavy as Google Analytics, so I built my own very rudimentary analytics. I pretty much never look at the data, but it's nice to know it's there. You can read more about how it works in the (surprisingly popular) [ analytics blog post](https://oliverjam.es/blog/diy-analytics-netlify-functions/).
