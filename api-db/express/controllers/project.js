import { models } from "../../sequelize/index.js";

export async function getAll(req, res) {
  try {
    const result = await models.project.findAll({
      where: { userId: req.user.id },
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getById(req, res, next) {
  try {
    const result = await models.project.findByPk(req.params.id, {
      include: [
        {
          model: models.centerline,
          attributes: ["id", "name"],
        },
        {
          model: models.takeoff,
          attributes: ["id", "name"],
        },
      ],
    });
    if (result.userId !== req.user.id)
      return res.status(403).send("Do not have access to project");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function create(req, res) {
  try {
    const userId = req.body.userId || req.user.id;
    const result = await models.project.create({ ...req.body, userId });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function remove(req, res) {
  try {
    await models.project.destroy({ where: { id: req.params.id } });
    res.status(200).end();
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function update(req, res) {
  try {
    const result = await models.project.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json(result[1][0]);
  } catch (err) {
    res.status(500).send(err);
  }
}
