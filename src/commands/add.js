export function add(store, text) {
  if (!text || text.trim() === '') {
    throw new Error('A task needs a description.');
  }
  const tasks = store.load();
  const task = { id: store.nextId(tasks), text: text.trim(), done: false };
  tasks.push(task);
  store.save(tasks);
  return task;
}
