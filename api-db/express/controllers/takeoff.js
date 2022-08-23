import { models } from "../../sequelize/index.js";

export async function getAll(req, res) {
  try {
    const result = await models.takeoff.findAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getById(req, res) {
  try {
    const result = await models.takeoff.findByPk(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function create(req, res) {
  try {
    const result = await models.takeoff.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function remove(req, res) {
  try {
    await models.takeoff.destroy({ where: { id: req.params.id } });
    res.status(200).end();
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function update(req, res) {
  const result = await models.takeoff.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  });
  res.status(200).json(result[1][0]);
}
