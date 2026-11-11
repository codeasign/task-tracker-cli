const PRIORITY_MARKERS = { low: '(low)', normal: '', high: '(high)' };

export function list(store) {
  const tasks = store.load();
  return tasks.map((task) => {
    const box = task.done ? '[x]' : '[ ]';
    const marker = PRIORITY_MARKERS[task.priority] || '';
    return `${task.id}. ${box} ${task.text} ${marker}`.trimEnd();
  });
}
