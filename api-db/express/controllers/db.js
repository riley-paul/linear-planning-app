import sequelize from "../../sequelize/index.js";

export async function init(req, res) {
  sequelize
    .sync({ force: true })
    .then(res.status(200).send("Database initialized"))
    .catch(err => res.status(500).send(err));
}

export async function drop(req, res) {
  sequelize
    .drop()
    .success(res.status(200).send("All tables dropped"))
    .error(res.status(500).send(err));
}
