---
title: Making Git push a bit friendlier
date: 2022-01-11
tags:
  - git
  - terminal
---

I have always found pushing my local Git branches to a remote repository a bit confusing. In my experience mentoring beginners this definitely confuses them too. I decided to sit down and figure out practical recommendations for working with it.

<!-- excerpt -->

Here's an approximation of what happens when a beginner tries to use Git branches for the first time. After committing some changes on the local branch they try to push to GitHub:

```
$ git switch --create example
Switched to a new branch 'example'
$ git push
fatal: The current branch example has no upstream branch.
To push the current branch and set the remote as upstream, use

  git push --set-upstream origin example
```

Great. The problem is that Git doesn't know what branch to push to on our remote repository (i.e. GitHub). We need to specify the name of the remote repository (usually "origin") and the remote branch ("example", same as our local branch).

```
$ git push origin example
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'example' on GitHub by visiting:
remote:      https://github.com/user/repo/pull/new/example
remote:
To github.com:user/repo.git
 * [new branch]      example -> example
```

We can replace the branch name with `HEAD` to get a consistent command that works for _any_ branch:

```
$ git push origin HEAD
Everything up-to-date
```

## Setting the upstream branch

If we include the `---set-upstream` option Git will remember this so we don't have to specify it in future.

```
$ git push --set-upstream origin example
Branch 'example' set up to track remote branch 'example' from 'origin'.
Everything up-to-date
```

Now we can just push directly:

```
$ git push
Everything up-to-date
```

Having to set the upstream on the first push is a little annoying though. On simple projects I often only ever push a branch once, when I'm ready to make a pull request. So setting the upstream doesn't save me any time or typing.

The exception would be my default branch (usually `main`). Since this effectively lives forever I end up pushing to it a lot, so I always make sure to set the upstream for it.

## Changing the default

The default config changed in Git 2.0 (released in 2014). The default value for the `push.default` option is now `simple`, which means "push to the branch with the same name on the remote".

At first this confused me, because I assumed this change meant I wouldn't have to specify the upstream branch. However the `simple` option is designed to be a safe default, and so won't magically match a remote branch you haven't set as the upstream (since this might overwrite a different remote branch that coincidentally has the same name as your local one).

If you're happy with that potential downside you can set `push.default` to `current`. This will do what I expected: always push to the remote branch with the same name as your local branch, even if you haven't set it as the upstream branch.

```
$ git config --global push.default current
```

Now we can push a new branch straight away without specifying the remote or branch name, or setting the upstream:

```
$ git switch --create example2
Switched to a new branch 'example2'
$ git push
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'example2' on GitHub by visiting:
remote:      https://github.com/user/repo/pull/new/example2
remote:
To github.com:user/repo.git
 * [new branch]      example2 -> example2
```
