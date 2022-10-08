const { Sequelize, Op } = require("sequelize");
const {
  Post,
  Comment,
  User,
  Notification,
  UserNotification,
} = require("../models/schema");

module.exports = {
  async storePost(req, res) {},
  async getPosts(req, res) {},
  async getPost(req, res) {},
  async storeFeedback(req, res) {
    const fb = await Comment.create(req.body);

    res.send(fb);
  },
  async getFeedback(req, res) {
    const feedbacks = await Comment.findAll({
      include: User,
    });

    res.send(feedbacks);
  },
  async getNotification(req, res) {
    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
    });

    const nots = await UserNotification.findAll({
      where: {
        UserId: req.query.id,
        seen: false,
      },
      include: [Notification],
    });
    res.send({ success: true, nots });
  },
  async makeSeen(req, res) {
    UserNotification.update(
      { seen: true },
      {
        where: {
          UserId: req.body.id,
        },
      }
    ).then((result) => {
      res.send({
        success: result[0],
      });
    });
  },
};
