const latest_in_array = (array, key) =>
  array.reduce((acc, val) => (acc[key] > val[key] ? acc : val)).id;

export default function initialProjectDisplay(project) {
  return project.centerlines
    ? {
        selectedCenterline: latest_in_array(project.centerlines, "name"),
        takeoffs: project.takeoffs.map((takeoff) => ({
          id: takeoff.id,
          shown: true,
          selectedRevision: latest_in_array(takeoff.revisions, "date_created"),
        })),
      }
    : {};
}
