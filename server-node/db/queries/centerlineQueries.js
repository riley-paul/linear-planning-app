/**
 * Browse
 * Read
 * Add
 * Edit
 * Delete
 *
 *
 *
 */


module.exports.getAllCenterlines = (db) => {
  const queryString = `
  SELECT * FROM api_centerline;`;
  return db
    .query(queryString)
    .then((res) => res.rows)
    .catch((err) => console.error(err.stack));
};

module.exports.getCenterlinesByProject = (db, project_id) => {
  const queryString = `
  SELECT * FROM api_centerline
  WHERE project_id = $1;`;
  const queryValues = [project_id];
  return db
    .query(queryString, queryValues)
    .then((res) => res.rows)
    .catch((err) => console.error(err.stack));
};

module.exports.getCenterlineById = (db, id) => {
  const queryString = `
  SELECT * FROM api_centerline
  WHERE id = $1`;
  const queryValues = [id];
  return db
    .query(queryString, queryValues)
    .then((res) => res.rows)
    .catch((err) => console.error(err.stack));
};
