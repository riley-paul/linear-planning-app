export default function getData(project, projectDisplay) {
  const data = { elevation: [], takeoffs: [], data: null };
  if (
    !project.hasOwnProperty("centerlines") ||
    !projectDisplay.hasOwnProperty("selectedCenterline")
  ) {
    data.error = "Loading Data...";
    return data;
  }

  data.elevation = project.centerlines.find(
    (i) => i.id === projectDisplay.selectedCenterline
  ).elevation;

  data.takeoffs = projectDisplay.takeoffs
    .filter((i) => i.selected)
    .map((select) => ({
      ...project.takeoffs.find((i) => i.id === select.id),
      ...select,
    }))
    .map((select) => ({
      ...select,
      dataset: select.revisions.find((i) => i.id === select.selectedRevision)
        .dataset,
    }));

  if (data.elevation.length === 0) data.error = "No Elevation Data";

  return data;
}
