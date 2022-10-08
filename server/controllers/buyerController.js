const Joi = require("joi");
const { Sequelize, Op } = require("sequelize");
const { Product, Comment, Order, User } = require("../models/schema");
const commentSchema = Joi.object({
  body: Joi.string().required(),
});

module.exports = {
  async getProduct(req, res) {
    const q = req.query.q;
    if (q) {
      const products = await Product.findAll({
        where: {
          [Op.and]: {
            reserved: false,
            sold: false,
            [Op.or]: {
              name: {
                [Op.like]: `%${q}%`,
              },
              description: {
                [Op.like]: `%${q}%`,
              },
            },
          },
        },
        include: [User],
      });

      res.send(products);
    } else {
      const products = await Product.findAll({
        where: {
          reserved: false,
          sold: false,
        },
        include: [User],
        order: [["id", "DESC"]],
      });
      res.send(products);
    }
  },
  async getNearbyProduct(req, res) {
    const { latitude, longitude } = req.query;

    const inMiles = 3963.0;
    //const inKMs = 100.8;

    const inKMs = 6371;

    const calculateDistance = `(
        ${inKMs} * acos(
            cos(radians(${latitude}))
            * cos(radians(latitude))
            * cos(radians(longitude) - radians(${longitude}))
            + sin(radians(${latitude})) * sin(radians(latitude))
        )
    )`;

    const q = req.query.q;
    if (q) {
      const products = await Product.findAll({
        where: {
          [Op.and]: {
            reserved: false,
            sold: false,
            [Op.or]: {
              name: {
                [Op.like]: `%${q}%`,
              },
              description: {
                [Op.like]: `%${q}%`,
              },
            },
          },
        },
        attributes: {
          include: [[Sequelize.literal(calculateDistance), "distance"]],
        },
        order: Sequelize.col("distance"),
        include: [User],
      });

      res.send(products);
    } else {
      const products = await Product.findAll({
        attributes: {
          where: {
            reserved: false,
            sold: false,
          },
          include: [[Sequelize.literal(calculateDistance), "distance"]],
        },
        order: Sequelize.col("distance"),
        include: [User],
        //limit: req.body.number || 11
      });

      res.send(products);
    }
  },
  async giveComment(req, res) {
    const result = commentSchema.validate(req.body);
    if (result.error) {
      res.send({
        success: false,
        message: result.error.message,
      });
    }

    const comment = await Comment.create(req.body);

    req.send(comment);
  },
  async reserve(req, res) {
    const reserved = await Product.update(
      {
        reserved: true,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.send({
      success: reserved[0],
    });
  },
};
