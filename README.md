# Task Tracker CLI

A small command-line tool for tracking tasks from a terminal. You add tasks, list them,
mark them done, and remove them. Tasks are stored in a plain JSON file next to wherever
you run the command.

This repository is the companion code for the Sypher courses "GitHub Fundamentals" and
"GitHub Actions". It exists so you have a real, small codebase to clone, branch, commit
to, and open pull requests against while you learn Git and GitHub, and a real set of
workflows to read, trigger, and extend while you learn CI/CD with GitHub Actions,
instead of practicing on a blank folder.

## Workflows in this repository

- `.github/workflows/ci.yml` — runs the test suite on every push and pull request.
- `.github/workflows/matrix-ci.yml` — runs the same tests across two operating systems
  and three Node.js versions, calling a reusable workflow for each combination.
- `.github/workflows/reusable-test.yml` — the reusable workflow `matrix-ci.yml` calls;
  it uses the composite action in `.github/actions/setup-project`.
- `.github/workflows/task-count.yml` — seeds a few sample tasks, runs the custom action
  in `.github/actions/task-count` to total them up, and uploads the result as a build
  artifact.
- `.github/workflows/deploy-docs.yml` — builds a static docs page from this README and
  deploys it to GitHub Pages through the `github-pages` environment.

## Requirements

- Node.js 20 or later
- Git

## Install

```bash
git clone git@github.com:codeasign/task-tracker-cli.git
cd task-tracker-cli
npm install
```

## Use it

```bash
node src/index.js add "Write the Q3 report"
node src/index.js list
node src/index.js done 1
node src/index.js remove 1
```

## Run the tests

```bash
npm test
```

## Project layout

```text
src/
  index.js          CLI entry point, parses argv and dispatches to a command
  taskStore.js       reads and writes tasks.json, the only file that touches disk
  commands/
    add.js
    list.js
    done.js
    remove.js
test/
  taskStore.test.js
```
