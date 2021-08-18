# RxJS masterclass starter

## Getting Started

After your git clone this repository run:

`npm ci --legacy-peer-deps`

This will install all of the node_modules and not mess with the package-lock.json file.

**DO NOT EVER RUN `npm install` ON THIS PROJECT**

## Local Development

Please look at Readme inside tasks

## Linting project all tasks

Run:

`npm run lint`

If you have errors please fix. You could try autofix with `npm run lint:fix`

## This project use git hooks

Husky improves your commits and more 🐶 woof!

More information you find on - https://typicode.github.io/husky

## Commitlint

Commitlint is used to have a common way of writing commit messages. `Conventional Commits` extension could help with that.

Basic structure of commit message: `type(scope): title`

`type` can be: [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test].

`scope` is a task number from jira - like AL-9999.

If you use Mac OS please check that you have right access to excute hooks. If need please change

```
chmod a+x .husky/pre-commit
```

```
chmod a+x .husky/commit-msg
```
