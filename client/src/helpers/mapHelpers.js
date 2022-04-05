export const addLayer = (map, data, name) => {
  map.current.on("load", () => {
    map.current.addSource(name, {
      type: "geojson",
      data,
    });

    map.current.addLayer({
      id: name,
      type: "line",
      source: name,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#cf0000",
        "line-width": 4,
      },
    });
  });
};
