import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const DEFAULT_PATH = 'tasks.json';

/**
 * TaskStore is the only part of this program that touches the filesystem.
 * Every command reads the current list through load() and writes it back
 * through save() instead of opening tasks.json itself.
 */
export class TaskStore {
  constructor(path = DEFAULT_PATH) {
    this.path = path;
  }

  load() {
    if (!existsSync(this.path)) {
      return [];
    }
    const raw = readFileSync(this.path, 'utf-8');
    return raw.trim() === '' ? [] : JSON.parse(raw);
  }

  save(tasks) {
    writeFileSync(this.path, JSON.stringify(tasks, null, 2) + '\n');
  }

  nextId(tasks) {
    return tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
  }
}
