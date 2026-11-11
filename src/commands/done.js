export function done(store, idArg) {
  const id = Number(idArg);
  if (!Number.isInteger(id)) {
    throw new Error(`"${idArg}" is not a valid task id.`);
  }
  const tasks = store.load();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(`No task with id ${id}.`);
  }
  task.done = true;
  store.save(tasks);
  return task;
}
