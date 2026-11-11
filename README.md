# Task Tracker CLI

A small command-line tool for tracking tasks from a terminal. You add tasks, list them,
mark them done, and remove them. Tasks are stored in a plain JSON file next to wherever
you run the command.

This repository is the companion code for the Sypher course "GitHub Fundamentals". It
exists so you have a real, small codebase to clone, branch, commit to, and open pull
requests against while you learn Git and GitHub, instead of practicing on a blank folder.

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
node src/index.js add "Fix login bug" --priority high
node src/index.js list
node src/index.js done 1
node src/index.js remove 1
```

Pass `--priority low|normal|high` to `add` to set a task priority. It defaults to `normal` when omitted.

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
