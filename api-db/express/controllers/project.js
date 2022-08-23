import { createError } from "../helpers/error.js";

import { models } from "../../sequelize/index.js";

export async function getAll(req, res) {
  const result = await models.project.findAll({
    where: { userId: req.user.id },
  });
  res.status(200).json(result);
}

export async function getById(req, res, next) {
  const result = await models.project.findByPk(req.params.id);
  if (result.userId !== req.user.id)
    return res.status(403).send("Do not have access to project");

  res.status(200).json(result);
}

export async function create(req, res) {
  const result = await models.project.create(req.body);
  res.status(201).json(result);
}

export async function remove(req, res) {
  await models.project.destroy({ where: { id: req.params.id } });
  res.status(200).end();
}

export async function update(req, res) {
  const result = await models.project.update(req.body, {
    where: { id: req.params.id },
  });
  res.status(200).json(result);
}
