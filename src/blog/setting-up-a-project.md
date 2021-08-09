---
title: Setting up a project from scratch
date: 2019-12-15T15:00:00.000Z
tags: ["web", "js", "tooling"]
---

Setting up a project can be as daunting as starting an essay. You sit staring at the blank white page (or dark mode editor) wondering where to begin. I'm going to describe the steps I would take to create a new web project. It will be JavaScript focused, since that's the ecosystem I'm comfortable in.

<!-- excerpt -->

I'm going to assume you aren't using a project-generator like [Create React App](https://create-react-app.dev/) or [Vue CLI](https://cli.vuejs.org/) and are starting totally from scratch.

I'll also be doing everything from the command line since that's how I typically work. I find it's faster and easier (after a bit of practice) than fiddling with Finder and other GUIs.

## Creating the directory

First I create a new directory for the project. I keep all my projects in a `~/Web` directory, so lets make it there. I like to use a short function that lives in my shell config (e.g. `.bashrc` or `.zshrc`) to both create and move into a directory at once:

```bash
mkcd () {
  mkdir "$1"
  cd "$1"
}
```

So I can run `mkcd ~/Web/my-project` and end up where I want to be. You could of course manually `mkdir` and then `cd` yourself.

## Initialising stuff

Since I want to be able to share this project on Github (and generally track any changes I make) I need to tell git to keep track of the directory:

```bash
git init
```

This is a web project, and I'm probably going to have to install some dependencies, so I'll also create a `package.json`:

```bash
npm init
```

You can either answer the questions it asks or just add a `-y` flag to the command to automatically skip them. It's easy enough to manually edit the `package.json` later.

An even smoother solution is to customise the default values, since they probably won't change much from project to project:

```bash
npm config set init-author-name "Oliver Phillips" -g
npm config set init-author-email "hello@oliverjam.es" -g
```

This will populate my name and email whenever I run `npm init -y`.

Since I'm using npm to install dependencies I want a `.gitignore` file. This will stop me committing 100 trillion nested node modules and creating a black hole at the centre of the Earth (or just crashing the VS Code git integration).

```bash
npx gitignore node
```

This will temporarily install the [gitignore](https://www.npmjs.com/package/gitignore) package from npm, then use it to generate a boilerplate `.gitignore` file for node projects.

## Linting

Linters are a good idea no matter what type of project you're building. A linter will _statically analyse_ your code and report any mistakes it finds. This means it just looks at the code, without running it, so it won't find certain types of errors. It will catch annoying hard to spot stuff like this though:

```js
function doStuff(fileInput) {
  // many lines
  console.log(fileinput); // undefined 😱
}
```

I would _strongly_ recommend only linting for actual errors. There are lots of rulesets that let you specify exact formatting or styles of code, but these usually get in the way more than they help. A better way to enforce consistency across a team is to format all your files [with Prettier](#formatting).

### ESLint

ESLint is a great JavaScript linter that integrates with most text editors to highlight problems as you type.

I install and configure it by running the ESLint wizard and answering some questions:

```bash
npx eslint --init
```

The CLI will ask you a few questions about the code you're writing and then create a basic config file. It will ask if it should automatically install ESLint and other required dependencies too.

You should now have a config file that looks something like this:

```json
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {}
}
```

You can [configure specific rules](https://eslint.org/docs/user-guide/getting-started#configuration) by adding to the `"rules"` object.

I can now lint everything in the directory with:

```bash
npx eslint .
```

Make sure you have an editor plugin so that errors are also highlighted as you type.

#### Linting React

ESLint can be very useful for writing React code, especially the [Rules of hooks]() plugin.

If you're using Create React App it will come with [its ESLint config](https://www.npmjs.com/package/eslint-config-react-app) pre-configured. I highly recommend using the same config on non-CRA React projects, as it is a great selection of rules that will catch real errors. Other configs like the Airbnb preset have a lot of very opinionated rules that will get in your way.

Unfortunately due to the way ESLint configs work you'll have to install all of the CRA config's dependencies yourself:

```bash
npm install -D eslint-config-react-app @typescript-eslint/eslint-plugin@2.x @typescript-eslint/parser@2.x babel-eslint@10.x eslint@6.x eslint-plugin-flowtype@3.x eslint-plugin-import@2.x eslint-plugin-jsx-a11y@6.x eslint-plugin-react@7.x eslint-plugin-react-hooks@1.x
```

You can then configure this in your `.eslintrc.json` file:

```json
{
  "extends": "react-app"
}
```

### Stylelint

Stylelint is the CSS equivalent of ESLint. I don't know if I just make more JS mistakes, but I find myself using this less. It is useful if you would like to check your CSS to ensure you haven't mistyped any properties or made other mistakes.

Install Stylelint and the basic config with:

```bash
npm i -D stylelint stylelint-config-recommended
```

Then configure it by creating a `.stylelintrc`:

```json
{
  "extends": "stylelint-config-recommended"
}
```

This will turn on only rules designed to catch actual errors. If there are stylistic or opinionated rules you'd like to enable you can do [turn them on manually](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#the-configuration-object).

I can lint from the command line:

```bash
npx stylelint "**/*.css"
```

This will lint all CSS files in all directories.

## Formatting

Prettier is a life-changing tool for auto-formatting your code. It's a good idea to have this set up from the very beginning so that all your code is always consistently formatted no matter who writes it.

I install it with:

```bash
npm i -D prettier
```

I can now format files from the command line with:

```bash
npx prettier --write '**/*.{js,css,html,md}'
```

Prettier can format lots of different file types, so I specify the file extensions I'm using. You can check you've got the command right by replacing `--write` with `--check`. Prettier will list all the files with problems but will not change them.

It's nice to have an editor plugin that will auto-format my file when I save. This frees me to write code with abandon, shoving entire functions onto a single line and letting Prettier instantly format it.

You don't _need_ to configure Prettier as it is designed to have sensible defaults. However you can get inconsistencies if different team members have different personal editor configurations. Create a `.prettierrc` file with no rules:

```json
{}
```

This should override the local plugin config and make it use the Prettier defaults. Of course you can add project-specific rules there if you don't like the defaults. For example I prefer trailing commas, so I always enable that rule.

```json
{
  "trailingComma": "es5"
}
```

## Git hooks

Having all these development niceties is great, but it's easy to forget to run them, which would allow unformatted or error-riddled code to be committed. You can use git hooks to run the checks whenever somebody commits to the codebase.

I'll be using Husky to configure the hooks and lint-staged to run my tasks against only changed files.

I install both dependencies:

```bash
npm i -D husky lint-staged
```

Then configure lint-staged in the `package.json`:

```json
{
  "lint-staged": {
    "*.css": "stylelint",
    "*.js": "eslint",
    "*.{js,css,html,md}": ["prettier --write", "git add"]
  }
}
```

Since Prettier _changes_ the files I've already staged I need to pass two commands to lint-staged—the Prettier one and then `git add`, to ensure the formatting changes get staged as part of the current commit.

Finally I need to tell git to run lint-staged before every commit, by configuring Husky in my `package.json`:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
}
```

Now whenever I try to commit any staged files will be linted, then formatted with Prettier. If any of those tasks find an error the commit will be prevented so I can fix it.

## Development environment

This is usually where I'd install the relevant dependencies for the libraries I needed, then set up my `"start"` and `"dev"` scripts in the `package.json`. This is totally different depending on the type of project though, so I'll just cover "vanilla" options.

### Vanilla static website

If I'm building a simple HTML page then I don't need any libraries or frameworks. It's nice to have a dev server that will auto-reload when I save changes though. I tend to reach for [browser-sync](https://www.browsersync.io/docs/command-line) for this.

First I install it:

```bash
npm i -D browser-sync
```

The command line API is easy to use with npm scripts. This script will start a dev server, open it in your browser and watch your files for changes:

```json
{
  "scripts": {
    "dev": "browser-sync start --server --watch"
  }
}
```

You can [configure it further](https://www.browsersync.io/docs/command-line) to only watch certain file types (or ignore files).

#### On-device testing

One really cool browser-sync feature is testing your dev site on real devices. When the server starts it'll log both a "Local" and "External" URL. You can visit the external one on any device connected to the same wi-fi as this machine, so you can see your changes in real-time on a mobile phone.

### Node server

If I'm developing a server I usually reach for [nodemon](https://nodemon.io/). It's similar to browser-sync in that it will watch your files and automatically restart your server when you save changes.

Where you would normally run `node myfile.js` you use `nodemon myfile.js`.

I need to install it:

```bash
npm i -D nodemon
```

Then set up my npm scripts:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

## Finally, leaving my machine

I generally sync all of my projects to GitHub. It's free, convenient, and where the whole open-source community lives. This may change in the future given their current [unrepentant support for US Immigrations and Customs Enforcement (ICE)](https://github.com/drop-ice/dear-github-2.0), but for now there aren't really better options.

I like to use [Hub](https://github.com/github/hub), which allows you to do GitHub stuff (like creating repos) from your terminal. You can install this with [Brew](https://brew.sh):

```bash
brew install hub
```

I create a repository on GitHub:

```bash
hub create
```

You can specify a name here—it will default to the directory name.

Hub will automatically set up the remote URL so you can push your code up and set the default remote:

```bash
git push origin master -u
```

I then open the GitHub repo to check everything worked:

```bash
hub browse
```

This should open your shiny new repo on GitHub in your web browser. Make sure you write a `README.md` so people know what your project is for!
