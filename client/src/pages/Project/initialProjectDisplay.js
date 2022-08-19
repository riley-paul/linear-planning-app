const latest_in_array = (array, key) =>
  array.reduce((acc, val) => (acc[key] > val[key] ? acc : val), {});

export default function initialProjectDisplay(project) {
  return {
    ...project,
    centerline: latest_in_array(project.centerlines, "name"),
    takeoffs: project.takeoffs.map((takeoff) => ({
      ...takeoff,
      open: false,
      selected: false,
      revision: latest_in_array(takeoff.revisions, "date_created"),
    })),
  };
}
