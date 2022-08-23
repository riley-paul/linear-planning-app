import sequelize from "../../sequelize/index.js";

export async function init(req, res) {
  sequelize
    .sync({ force: true })
    .then((res) => res.status(200).send("Database initialized"))
    .catch((err) => res.status(500).send(err));
}

export async function drop(req, res) {
  sequelize
    .drop()
    .then((res) => res.status(200).send("All tables dropped"))
    .catch((err) => res.status(500).send(err));
}
