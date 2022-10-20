---
title: Deploying web apps to Fly.io
date: 2022-10-19
tags:
  - deploy
  - infra
---

With the [demise of the Heroku free tier](https://help.heroku.com/RSBRUH58/removal-of-heroku-free-product-plans-faq) looming I've been searching for an alternative place to deploy simple web apps. It looks like [Fly.io](https://fly.io) is emerging as a frontrunner, so I thought I'd play around with it and document my experience.

<!-- excerpt -->

## Key features

I'm looking for something quick and easy to setup, that doesn't require my code to be written a certain way, and has a free tier. That last one has gotten harder to find (probably [blame cryptocurrency shenanigans](https://drewdevault.com/2021/04/26/Cryptocurrency-is-a-disaster.html)). It's important to me because most of my random side-projects average less than one user a month—paying a nominal $5 or something for that is pretty silly.

## What is Fly?

Fly is a "Platform-as-a-service" provider (PaaS), sort of like Heroku. You give them your app's code and they provision the server to run it on.

They require a payment method even if you're staying within the free tier to prevent abuse, but limits are pretty generous. You get three shared-CPU 256MB RAM virtual machines to play with, and everything scales with usage beyond that. Each additional machine costs $1.94, which is a lot better than some services where crossing the threshold from "basic" to "pro" plan can triple your spend.

## How do you deploy?

You have to install and use Fly's command-line tool to deploy, which is a bit annoying. It would be nice if they had an HTTP service or something ([Heroku do](https://devcenter.heroku.com/articles/build-and-release-using-the-api)). However it seems to be the norm nowadays to have a CLI client for every service you use.

The canonical way to deploy appears to be:

1. [Install the Fly CLI](https://fly.io/docs/flyctl/installing/)
1. Authenticate the CLI with [`flyctl auth login`](https://fly.io/docs/flyctl/auth-login/)
1. Detect config and deploy with [`flyctl launch`](https://fly.io/docs/flyctl/launch/)

Fly does some magic to figure out how to build your code (e.g. "this is a Next.js app so it needs Node etc"), provisions a machine in the region of your choice, then builds and deploys your code. After you've run `launch` once you can re-deploy with `flyctl deploy`.

This process also generates a bunch of config and dumps it into your project, which is a little weird the first time. You'll end up with a `fly.toml`, `Dockerfile` and `.dockerignore`. Although Fly magically figures out how your app works it insists on writing it down for next time. This is sort of nice as you can see the assumptions it made and tweak them if you need to.

### `fly.toml`

The `fly.toml` file is how you configure the machine your app runs on. I _think_ this is about as minimal as you can go:

```toml
app = "next-cookie-session"

[[services]]
  internal_port = 8080

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```

Your app needs a name and at least one "service". Services have internal ports they listen on and can have outside internet traffic routed to them. In this case we're having Fly forward all HTTPS traffic from port 443 to our app on port 8080.

You can add a _lot_ more config in here to control how your machine restarts or handles errors, health check requests, load balancing and concurrency etc.

### `Dockerfile`

It's a bit weird to have a `Dockerfile` generated when you weren't planning on using Docker. Fly uses these as a universal "describe what your app needs" language. Here's a minimal `Dockerfile` for a Node.js app:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY . .
CMD ["npm", "start"]
```

This effectively tells Fly: "I'm going to need a machine with Node version 16 installed, copy my files into the `/app` directory, then run `npm start` to get the server going". But this could just as easily describe something different, like a Go app.

It's important to note that you don't have to use Docker yourself—if you don't have Docker installed Fly will provision a free "builder" machine in your account, and use that to build all your apps in the cloud.

## Persistent volumes

Almost all PaaS services nowadays are "ephemeral". This means they recreate your app from scratch every time you deploy (and sometimes more often), because it's simpler to treat the Git repo as the source of truth.

Unfortunately this means you cannot rely on anything in the machine's filesystem sticking around. This makes it hard to use a simple database like SQLite, since that relies on writing files.

Fantastically Fly avoids this problem with their [Volumes](https://fly.io/docs/reference/volumes/) feature. This lets you specify a chunk of storage on the machine that should be kept around permanently.

You create a volume using the CLI:

```shell
flyctl volumes create myapp_data --region lhr --size 1
```

This will create a 1GB volume for the app whose `fly.toml` is in the current directory. You can _use_ this volume in your app by adding it to the `fly.toml`:

```toml
[mounts]
  source="myapp_data"
  destination="/data"
```

This maps the volume to the `/data` directory in your app. You would then configure your database to store files in here.

## Frustrations

Coming from Heroku I would like a slightly simpler experience for beginners or devs deploying very simple apps. Maybe Heroku is _too_ magical, but I kind of miss not really needing any configuration at all to get started.

You _can_ use [Heroku-like buildpacks](https://fly.io/docs/reference/builders/#buildpacks) rather than Dockerfiles, but I found the docs on this a bit confusing (and lacking examples). It seems like Fly have been moving pretty quickly and iterating on this stuff, so example config in the wild often doesn't match up. My experiment with a buildpack didn't end well (deploying was way slower than with a Dockerfile, and it broke a lot).

The default `fly.toml` and `Dockerfile` have _a lot_ in them, and this could be offputting or confusing to beginners. I had a frustrating time trying to figure out exactly what was _required_ and what was a nice-to-have.

It turned out quite a lot of both files could be deleted without breaking my app. The docs are partly to blame here—the section on `fly.toml` don't really specify what default values it uses, or what config is absolutely necessary.

## Conclusion

I'm a fullstack dev who mostly writes JS, with a bias towards UX/UI. I don't want to spend a lot of time or energy dealing with low-level primitives—I just want to make apps. I've gone through so much frustration in the past dealing with the complexities of AWS, so it's incredibly heartening to see a new player in this space focused on a better experience for devs like me.

I'll probably be putting anything I need a server for on Fly for the foreseeable future.
