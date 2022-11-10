const depCompare = (oldDeps, newDeps) =>
  oldDeps.length === newDeps.length &&
  oldDeps.every((dep, i) => dep === newDeps[i]);

export default depCompare;
