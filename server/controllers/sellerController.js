const { Op } = require("sequelize");
const Joi = require("joi");
const { Product, Comment } = require("../models/schema");

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.required(),
});

const commentSchema = Joi.object({
  body: Joi.string().required(),
});

module.exports = {
  async postProduct(req, res) {
    const result = productSchema.validate(req.body);
    if (result.error) {
      res.send(result.error.message);
    }

    console.log(req.user, "user");

    const product = await Product.create(result.value);

    res.send(product);
  },
  async giveComment(req, res) {
    const result = commentSchema.validate(req.body);
    if (result.error) {
      res.send(result.error.message);
    }

    const comment = await Comment.create(req.body);

    req.send(comment);
  },
  async getMyProduct(req, res) {
    const id = req.query.id;

    const products = await Product.findAll({
      where: {
        UserId: id,
      },
    });

    res.send(products);
  },
  async getMyReserved(req, res) {
    const reserved = await Product.findAll({
      where: {
        [Op.and]: {
          UserId: req.query.id,
          reserved: true,
          sold: false,
        },
      },
    });

    res.send(reserved);
  },
  async getMySold(req, res) {
    const sold = await Product.findAll({
      where: {
        [Op.and]: {
          UserId: req.query.id,
          sold: true,
        },
      },
    });

    res.send(sold);
  },
  async sell(req, res) {
    const sold = await Product.update(
      {
        sold: true,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.send({
      success: sold[0],
    });
  },
  async release(req, res) {
    const released = await Product.update(
      {
        reserved: false,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.send({
      success: released[0],
    });
  },
  async getMyCount(req, res) {
    const productCount = await Product.count({
      where: {
        UserId: req.query.id,
        sold: false,
      },
    });
    const reserved = await Product.count({
      where: {
        [Op.and]: {
          UserId: req.query.id,
          reserved: true,
          sold: false,
        },
      },
    });
    const sold = await Product.count({
      where: {
        [Op.and]: {
          UserId: req.query.id,
          sold: true,
        },
      },
    });

    const products = await Product.findAll({
      where: {
        UserId: req.query.id,
        sold: false,
      },
      limit: 5,
      order: [["id", "desc"]],
    });

    res.send({
      productCount,
      reserved,
      sold,
      products,
    });
  },
};
