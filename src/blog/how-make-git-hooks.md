---
title: How to make your own Git hooks
date: 2021-02-15
---

It turns out Git hooks are pretty simple when you strip them back to basics. I always thought they were a sort of arcane magic. My only experience with them was trying (and often failing) to chant the right combination of Husky, lint-staged and Prettier commands required to ensure new code is formatted consistently.

<!-- excerpt -->

## What is a Git hook?

Git hooks are programs that automatically run at different points in the lifecycle of a Git repository. The most common one I see in JavaScript projects is the "pre-commit" hook. As the name suggests this runs right before a commit is made (i.e. after a developer runs `git commit` in the repo).

This allows you to "hook" into the Git process to run your own code, and potentially prevent the commit. For example you may want to run a linter and tests to make sure the code is correct. If the tests fail you would want to prevent the commit and ask the developer to fix them first.

## How are hooks made?

Until recently I'd only ever used [Husky](https://typicode.github.io/husky/) to create Git hooks. Don't get me wrong, it's a great tool, but it felt a little unwieldy at times.

It turns out all you need to make a Git hook is an executable script in the Git hooks directory. By default (assuming you are in a Git repo) this is `.git/hooks`. There are even some example ones in there.

The name of the file determines when in the Git lifecycle it runs. E.g. to make a pre-commit hook you can create a file at `.git/hooks/pre-commit`:

```bash
#! /bin/sh

echo "This runs before your commits!"
```

Finally you have to change the permissions of this file so it is executable (since Git needs to be able to execute it):

```bash
chmod +x .git/hooks/pre-commit
```

That's it—now whenever you `git commit` you'll see `"This runs before your commits!"` printed in your terminal.

For more useful/complex stuff you'll probably want to defer to an npm script. E.g. your `pre-commit` file can just contain:

```bash
#! /bin/sh

npm run pre-commit
```

Now you can configure that script in your `package.json` to do anything you like (e.g. run tests, linter, etc).

```json
{
  "scripts": {
    "lint": "eslint .",
    "test": "jest",
    "pre-commit": "npm run lint && npm run test"
  }
}
```

If your script exits with a non-zero (i.e. error) code then the hook will stop the commit from finishing.

## How can you share hooks?

Unfortunately the `.git/hooks` folder isn't shared by other people cloning your repository. Since the main reason for a pre-commit hook is to make sure every contributor's code is consistent and correct this isn't ideal.

Conveniently you can tell Git to use a _different_ directory to look for hooks:

```bash
git config core.hooksPath .githooks
```

This command sets the hooks directory to `.githooks/`. You can add hook files to this directory instead and Git will run them from there. Since this directory will get committed everyone who clones the repo will have access to them.

The final step is to make sure this config is changed for everyone who is running your project. You can do this with an npm `postinstall` script in your `package.json`. This is a special npm script that will run right after somebody runs `npm install`.

```json
{
  "scripts": {
    "postinstall": "git config core.hooksPath .githooks"
  }
}
```

Now anyone who clones your repo and runs `npm install` will get the correct hooks path set for this repo.

## Bonus round: formatting changes with Prettier

By far my biggest use for pre-commit hooks is to format the changed files with Prettier. This ensures that contributors can write code however they like, and have it it auto-formatted into the style the project prefers. This keeps everything consistent and easy to read.

You _could_ just run `prettier --write .` before every commit. This would format the entire project. Prettier isn't super slow, but it's still inefficient to format 1000 files every time you change 1.

You'd also have to manually ensure the formatted files were staged for commit afterwards. Otherwise you'd end up committing the unformatted version that you had previously staged.

Instead you should use [lint-staged](https://github.com/okonet/lint-staged) to run commands only against changed files, and auto-stage the updated version afterwards.

```bash
npm i -D prettier lint-staged
```

You need a `lint-staged` field in your `package.json`:

```json
{
  "lint-staged": {
    "*.{md,html,css,js}": "prettier --write"
  }
}
```

This tells lint-staged to look for changes to `.md`, `.html`, `.css` and `.js` files, and run Prettier on each one.

To set up the Git hooks first change your Git hooks directory with:

```bash
git config core.hooksPath .githooks
```

Now we can create a pre-commit hook at `.githooks/pre-commit`:

```bash
#! /bin/sh

npm run pre-commit
```

Then make the hook executable with:

```bash
chmod +x .githooks/pre-commit
```

and finally add `postinstall` and `pre-commit` scripts to your npm scripts in `package.json`:

```json
{
  "scripts": {
    "postinstall": "git config core.hooksPath .githooks",
    "pre-commit": "lint-staged"
  }
}
```

Now when a new contributor clones your repo and runs `npm install` their Git hooks directory will be changed to `.githooks`. Whenever they commit changes the `.githooks/pre-commit` hook will run, which runs the `pre-commit` npm script. This script runs `lint-staged`, which checks the changed files to see if they match the file extensions specified. If they do it will format them with Prettier, then re-add those changes to be committed. Finally (assuming nothing went wrong) the commit will complete.
