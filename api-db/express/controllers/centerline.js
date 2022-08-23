import { models } from "../../sequelize/index.js";

export async function getAll(req, res) {
  const result = await models.centerline.findAll();
  res.status(200).json(result);
}

export async function getById(req, res) {
  const result = await models.centerline.findByPk(req.params.id);
  res.status(200).json(result);
}

export async function create(req, res) {
  try {
    const result = await models.centerline.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function remove(req, res) {
  await models.centerline.destroy({ where: { id: req.params.id } });
  res.status(200).end();
}

export async function update(req, res) {
  const result = await models.centerline.update(req.body, {
    where: { id: req.params.id },
  });
  res.status(200).json(result);
}
