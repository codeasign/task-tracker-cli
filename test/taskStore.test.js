import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { TaskStore } from '../src/taskStore.js';
import { add } from '../src/commands/add.js';
import { done } from '../src/commands/done.js';
import { remove } from '../src/commands/remove.js';

function tempStore() {
  const dir = mkdtempSync(path.join(tmpdir(), 'tracker-'));
  return { store: new TaskStore(path.join(dir, 'tasks.json')), dir };
}

test('add() creates a task with an incrementing id', () => {
  const { store, dir } = tempStore();
  const first = add(store, 'First task');
  const second = add(store, 'Second task');
  assert.equal(first.id, 1);
  assert.equal(second.id, 2);
  assert.equal(store.load().length, 2);
  rmSync(dir, { recursive: true, force: true });
});

test('add() defaults to normal priority and accepts a valid override', () => {
  const { store, dir } = tempStore();
  const normal = add(store, 'Normal task');
  const urgent = add(store, 'Urgent task', 'high');
  assert.equal(normal.priority, 'normal');
  assert.equal(urgent.priority, 'high');
  rmSync(dir, { recursive: true, force: true });
});

test('add() rejects an invalid priority', () => {
  const { store, dir } = tempStore();
  assert.throws(() => add(store, 'Task', 'urgent'), /Priority must be one of/);
  rmSync(dir, { recursive: true, force: true });
});

test('add() rejects an empty description', () => {
  const { store, dir } = tempStore();
  assert.throws(() => add(store, '   '), /needs a description/);
  rmSync(dir, { recursive: true, force: true });
});

test('done() marks the matching task as done', () => {
  const { store, dir } = tempStore();
  add(store, 'Write the report');
  const updated = done(store, '1');
  assert.equal(updated.done, true);
  rmSync(dir, { recursive: true, force: true });
});

test('remove() deletes the matching task', () => {
  const { store, dir } = tempStore();
  add(store, 'Write the report');
  remove(store, '1');
  assert.equal(store.load().length, 0);
  rmSync(dir, { recursive: true, force: true });
});
