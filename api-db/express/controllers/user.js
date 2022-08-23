import { models } from "../../sequelize/index.js";

export async function getById(req, res) {
  const result = await models.user.findByPk(req.params.id);
  res.status(200).json(result);
}

export async function create(req, res) {
  const result = await models.user.create(req.body);
  res.status(201).json(result);
}

export async function remove(req, res) {
  if (req.params.id !== req.user.id)
    return res.status(403).send("User can only remove their own account");

  await models.user.destroy({ where: { id: req.params.id } });
  res.status(200).end();
}

export async function update(req, res) {
  if (req.params.id !== req.user.id)
    return res.status(403).send("User can only update their own account");

  const result = await models.user.update(req.body, {
    where: { id: req.params.id },
  });
  res.status(200).json(result);
}
