---
title: Better dev environments with npm workspaces
date: 2021-06-10
tags:
  - npm
  - workspaces
  - js
---

As of version 7 npm now includes a feature called "workspaces". This is designed to help you manage multiple separate packages within a single project.

For example you may have a React frontend and an Express backend for your app that you want to manage as a single repository on GitHub. However this makes development awkward, as you constantly have to `cd` into the right directory to install dependencies or run npm scripts.

## npm setup

To use workspaces you need to be on the latest version of npm. Although the feature was added in npm 7 some of the best parts weren't available until later (e.g. installing dependencies came in v7.14.0).

If you originally installed Node and npm with a management tool like [Volta](https://volta.sh/) then you can get the latest version of npm by running `volta install npm` in your terminal. If not you can use npm to upgrade npm (🤯) by running `npm install -g npm`.

## Project setup

Let's imagine you have a minimal project set up with two sub-directories for your `client` and `server`:

```
my-project/
  client/
    index.js
    package.json
  server/
    index.js
    package.json
```

To use workspaces you need to create a `package.json` at the root of your project with the `"workspaces"` config:

```json
{
  "name": "my-project",
  "workspaces": ["client", "server"]
}
```

This tells npm that the `client` and `server` directories should be managed as workspaces.

## Using workspaces

Most npm commands can now have workspace-related options added to make them run against just one (or all) of your workspaces. To run a command against a single workspace you can append `--workspace=client`. To run a command against all workspaces you can append `--workspaces` (note the `s`).

All the following commands are run from the root directory. No `cd`ing around required!

### Installing packages

To install _all_ packages for all workspaces you can run:

```shell
npm install --workspaces
```

This is very useful when you first clone a project, to immediately get all the dependencies installed so you can run everything.

**Note**: npm will create a single `package-lock.json` and `node_modules` at the root of your repo containing all the dependencies. This can be more efficient as one combined `node_modules` is smaller (because there's less duplication).

To install a package into a single workspace you can run:

```shell
npm install express --workspace=server
```

### Running scripts

You can run npm scripts defined in your workspaces' `package.json` files. Read more in the [npm `run-script` docs](https://docs.npmjs.com/cli/v7/commands/npm-run-script#workspaces-support).

To run a script from a single workspace:

```shell
npm run test --workspace=client
```

Note this requires that `client` has a script named "test" defined in its `package.json`.

To run the same script in _all_ workspaces:

```shell
npm run test --workspaces
```

#### Missing scripts

If any workspace is missing a script you'll get an error trying to use `--workspaces`. Sometimes you just want to run all the scripts if they exist, and you don't care if they don't. There's [an option for this](https://docs.npmjs.com/cli/v7/commands/npm-run-script#if-present):

```shell
npm run test --workspaces --if-present
```

Now only those test scripts that actually exist will be run.

#### Running in parallel

Unfortunately npm runs the scripts in series, in the order the workspaces were defined in the top-level `package.json` (as far as I can tell, this isn't documented). This means you can't use it for long-running processes like dev servers, since the first script will never finish (and so the second script will never run).

Until npm implements something like Yarn workspaces's [`foreach --parallel`](https://yarnpkg.com/cli/workspaces/foreach) you'll have to workaround this by writing your own script.

In Mac/Linux environments you can run tasks in parallel using the `&` operator. So you could make an npm script in your top-level `package.json` to run multiple workspace-level scripts:

```json
{
  "scripts": {
    "dev": "npm run dev --workspace=client & npm run dev --workspace=server"
  }
}
```

This will run both scripts in the same terminal, which means all your logs will be mixed together. I also have no idea if it will work with tools that hijack the whole terminal (like Create React App). So in these cases you probably still want to just open two separate terminal tabs/windows.
