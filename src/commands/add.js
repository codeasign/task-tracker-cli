const VALID_PRIORITIES = ['low', 'normal', 'high'];

export function add(store, text, priority = 'normal') {
  if (!text || text.trim() === '') {
    throw new Error('A task needs a description.');
  }
  if (!VALID_PRIORITIES.includes(priority)) {
    throw new Error(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}.`);
  }
  const tasks = store.load();
  const task = { id: store.nextId(tasks), text: text.trim(), done: false, priority };
  tasks.push(task);
  store.save(tasks);
  return task;
}
