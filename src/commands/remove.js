export function remove(store, idArg) {
  const id = Number(idArg);
  if (!Number.isInteger(id)) {
    throw new Error(`"${idArg}" is not a valid task id.`);
  }
  const tasks = store.load();
  const next = tasks.filter((t) => t.id !== id);
  if (next.length === tasks.length) {
    throw new Error(`No task with id ${id}.`);
  }
  store.save(next);
  return id;
}
