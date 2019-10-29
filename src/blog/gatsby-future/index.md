---
title: Gatsby is the future
date: 2019-07-03T12:00:00Z
tags: ["js", "gatsby", "wordpress", "web", "future"]
---

I think Gatsby is the future of the web. I'm going to explain why by comparing it to [WordPress](https://wordpress.org/), the go-to platform for websites over the last fifteen years. I think Gatsby already meets or exceeds most of the things that make WordPress so popular, so it's well placed to become the next huge thing.

<!-- excerpt -->

## Why WordPress was so successful

I think WordPress has dominated the web for a few reasons.

### Free and open-source

WordPress is free and open-source, but backed by a private company called Automattic. This makes it an obvious default to build on, especially for small to mid-sized sites with limited budgets. If you're an agency charging under £10k for a basic marketing site plus blog you can't really afford to splash a decent chunk of that on a framework or content management system.

### Easy hosting

The proliferation of cheap shared PHP hosting that sprang up in the 2000s made it easy to throw a WordPress site somewhere. There are also lots of well-established (slightly more expensive) dedicated WordPress hosts who manage the installation and upgrade process. This is great for peace of mind after handing a site off to a non-technical client.

### Huge community

There are a lot of developers and businesses contributing themes, plugins and code to WordPress. This makes it easy to install new functionality without writing code yourself.

### Great content experience

The WordPress CMS makes it easy for non-technical users to log in and update the site. I think developers sometimes underestimate just how important this is—even something as "simple" to us as editing a Markdown file on Github is too much for someone at a small business already doing three jobs who just wants to edit a blog post.

## Gatsby overview

Gatsby started life as a React-based static-site generator. It takes various data sources and uses React components as templates to generate HTML files. The big difference between Gatsby and most static-site generators is that Gatsby also creates a client-side JavaScript app. This best-of-both-worlds approach means your site renders the initial view very quickly, then continues to "boot up" into a full-blown single-page app while the user is browsing. Once enough of the "app" has been loaded navigation becomes instant and doesn't require server round-trips.

## Gatsby vs WordPress

Lets revisit the four things that helped WordPress succeed and see how Gatsby matches up.

### Free and open-source

Gatbsy is also free and open source. There's a VC-backed company behind the software ([Gatsby Inc](https://www.gatsbyjs.com/)) just like Automattic. Gatsby Inc is a _little_ bit smaller than Automattic, but it's very new. They've assembled a [team of great people](https://www.gatsbyjs.com/about) who clearly care deeply about building a fantastic tool.

### Easy shared hosting

Since Gatsby sites are entirely static (everything is either pre-rendered at build time or rendered on the client) you don't even need your own server. There's been a boom in cheap (or free!) static hosts with great developer experiences (e.g. Netlify, Now) and Gatsby is positioned to take advantage. You can even throw a Gatsby site on Github Pages if you like.

### Huge community

The community isn't as big as WordPress' but it's growing quickly. The Gatsby ecosystem is built on plugins, and the core Gatsby APIs make it easy to create your own if you can't find what you're looking for.

### Great content experience

This is where Gatsby is still lacking. A static site is great for many reasons, but it does make content editing more complicated. You've got to store the assets somewhere, and without a server and database that means you're reliant on 3rd party services like [Contentful](https://www.contentful.com/) and [Netlify CMS](https://www.netlifycms.org/). Lots of Gatsby sites are developer-focused and store content in Github, but this isn't as feasible for non-technical editors.

## New Gatsby features

### Themes

Gatsby's new [Themes](https://www.gatsbyjs.org/blog/2018-11-11-introducing-gatsby-themes/) are a huge step in the right direction for developers building client sites. Themes allow you to hide all the complexity and setup of big sites that need lots of plugins behind a single dependency. All of the config files and base components/styling can live somewhere else, an `npm install` away. They're also quite easy to override using [component shadowing](https://www.christopherbiscardi.com/post/component-shadowing-in-gatsby-child-themes).

### MDX

[MDX](https://mdxjs.com/) is a new superset of markdown that also allows JSX (to render React components). Writing in it is a pretty amazing experience, and it will get even better with good CMS support. It's still fairly new (most Gatsby sites still use Remark Markdown rather than MDX), but it's getting more and more mature. This very blog is written in MDX if you'd like to see [an example](https://github.com/oliverjam/oliverjam.es/blob/master/content/blog/flicker-avatar-animation/index.mdx).

I find using JSX in MDX is nicer than [shortcodes](https://www.christopherbiscardi.com/post/towards-shortcodes-for-gatsby-sites) in WordPress. You can achieve the same functionality, but the syntax for content editors is closer to HTML (a standard). Creating React components is a nicer experience than registering custom shortcodes. You can also leverage any of the pre-existing React components on npm/Github. MDX makes creating custom content very accessible to non-technical users:

```markdown
# My blog post

Hello world

<Youtube id="dQw4w9WgXcQ" />
```

## Where Gatsby outshines WordPress

### Performance

Gatsby is super fast by default. It's possible to make a slow Gatsby site, but out of the box it generally gets perfect scores on performance tests. In contrast whilst it is possible to make a super fast WordPress site the default isn't great. The plugin model means it's common to come across sites with tons of injected blocking resources, three different copies of JQuery and a generally slower experience.

### Data-sourcing

WordPress has an opinionated data model. You store everything in the MySQL database and adapt everything to fit how WordPress wants it to work. Gatsby is much more data-agnostic. The plugin system makes it simple to combine different sources of data. You can have markdown files in a Github repo, a Google Sheet and a CMS like Contentful all piping content in to the site at build time.

### Developer experience

React has [taken over the JavaScript world](https://wptavern.com/npms-2019-javascript-ecosystem-survey-shows-63-of-respondents-are-using-react). Developers want to use it for everything, but on its own React isn't well-suited to static sites. Gatsby enabled devs to use the powerful framework they already know to create great static sites as well as apps. The dev experience of Gatsby is pretty incredible too. It's very quick and easy to get started, especially since you don't have to worry about getting some LAMP/MAMP setup going and running your own MySQL database locally.

### JavaScript all the things

For better or worse PHP has [fallen out of favour](https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-languages), which makes it a bit off-putting to do WordPress development nowadays. It's kind of nice to be able to use JavaScript for everything. I've built a few [Jekyll sites](https://github.com/oliverjam/workstream-jekyll) in my time, and as a primarily frontend/JS developer it was awkward having to context switch into Ruby-land to `gem install` or `bundler` something. A totally JavaScript API also opens up the world of compile-to-JS languages like [TypeScript](https://www.typescriptlang.org/) and [Reason](https://reasonml.github.io/).

### Performance

There's no other way to say it: Gatsby sites are blazing fast. There are lots of modern best-practices included by default. Pre-rendered static HTML pages are obviously faster than a server hitting a database and rendering on the fly, but Gatsby goes even further. It will automatically split your JavaScript bundle into chunks for each route, so users don't load more code than they have to. It also smartly preloads assets, and even pages. Since it uses the React runtime once the JS loads it can "boot up" into a single-page app that pre-caches new routes so page navigation becomes instant.

### Modern interaction paradigm

WordPress sites usually still rely on JQuery to sprinkle interactivity on top of server rendered pages. When sites require a lot of dynamic interactions this can get pretty gnarly to manage. Gatsby is nice because it's both a platform for static sites _and_ client-side apps. Since you always have React available it's pretty trivial to quickly throw a more dynamic "app-like" experience onto certain parts of a site.

## Problems Gatsby needs to solve

### Content management

I think the content management problem is a big one for Gatsby. Until there's a good (probably included) solution for this I can't imagine the long tail of agencies building marketing sites for mid-tier companies will jump on board. Third party CMSs are great but they're usually an extra load of setup (and another thing to break during upgrades down the line) _and_ usually another monthly bill for the client.

This is obviously a difficult challenge for a framework designed to run without a server or database. One possible solution could be a (probably paid) product offering from Gatsby Inc (the company rather than the OSS project) that adds CMS functionality on top for those who need it and want an "integrated" solution. Gatsby Inc are already experimenting with associated products like [Gatsby Preview](https://www.gatsbyjs.com/preview) so this isn't entirely unfeasible.

### Authentication

This is related to content management—if you want people to be able to update the site you need to be able to authenticate users. Without a server this is pretty difficult. Again there are third-party solutions like [Authy](https://authy.com/) and [Netlify Identity](https://www.netlify.com/docs/identity/) but this won't work for everyone.

### Mindshare

There are still huge numbers of developers out there comfortable with their WordPress LAMP stack. If they're happy and productive then that's great, but Gatsby needs to find a way to reach them and communicate that there could be something even better. Gatsby also needs to win mindshare amongst clients, as there's not much an agency can do if a business insists on a WordPress site because that's what they know.

## Final thoughts

I love creating Gatsby sites as a developer, and I love browsing Gatsby sites as a user (you can usually tell it's a Gatsby site when everything is loading _instantly_). I've built WordPress sites in the past and I have a lot of love for what it's done for the web and open source, but I think the time has come for a new default that really pushes the web forward.
