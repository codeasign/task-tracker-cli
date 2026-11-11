export function list(store) {
  const tasks = store.load();
  return tasks.map((task) => {
    const box = task.done ? '[x]' : '[ ]';
    return `${task.id}. ${box} ${task.text}`;
  });
}
