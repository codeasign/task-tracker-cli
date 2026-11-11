import { readFileSync, existsSync, appendFileSync } from 'node:fs';

function loadTasks(path) {
  if (!existsSync(path)) {
    return [];
  }
  const raw = readFileSync(path, 'utf-8');
  return raw.trim() === '' ? [] : JSON.parse(raw);
}

function setOutput(name, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  appendFileSync(outputPath, `${name}=${value}\n`);
}

const tasksFile = process.env['INPUT_TASKS-FILE'] || 'tasks.json';
const tasks = loadTasks(tasksFile);
const done = tasks.filter((task) => task.done).length;

setOutput('total', tasks.length);
setOutput('done', done);

console.log(`Counted ${tasks.length} task(s), ${done} done.`);
