#!/usr/bin/env node
import { TaskStore } from './taskStore.js';
import { add } from './commands/add.js';
import { list } from './commands/list.js';
import { done } from './commands/done.js';
import { remove } from './commands/remove.js';

const [, , command, ...args] = process.argv;
const store = new TaskStore();

switch (command) {
  case 'add': {
    const task = add(store, args.join(' '));
    console.log(`Added task ${task.id}: ${task.text}`);
    break;
  }
  case 'list': {
    const lines = list(store);
    if (lines.length === 0) {
      console.log('No tasks yet. Add one with: tracker add "Your task"');
    } else {
      lines.forEach((line) => console.log(line));
    }
    break;
  }
  case 'done': {
    const task = done(store, args[0]);
    console.log(`Marked task ${task.id} done: ${task.text}`);
    break;
  }
  case 'remove': {
    const id = remove(store, args[0]);
    console.log(`Removed task ${id}`);
    break;
  }
  default: {
    console.log('Usage: tracker <add|list|done|remove> [arguments]');
    process.exitCode = 1;
  }
}
