import { models } from "../../sequelize/index.js";

export async function getAll(req, res) {
  const result = await models.takeoff.findAll();
  res.status(200).json(result);
}

export async function getById(req, res) {
  const result = await models.takeoff.findByPk(req.params.id);
  res.status(200).json(result);
}

export async function create(req, res) {
  const result = await models.takeoff.create(req.body);
  res.status(201).json(result);
}

export async function remove(req, res) {
  await models.takeoff.destroy({ where: { id: req.params.id } });
  res.status(200).end();
}

export async function update(req, res) {
  const result = await models.takeoff.update(req.body, {
    where: { id: req.params.id },
  });
  res.status(200).json(result);
}