const Joi = require("joi");
const {
  User,
  Notification,
  Comment,
  Product,
  Payment,
  Role,
  WebChatBot,
  UserNotification,
  Account,
} = require("../models/schema");
const { Sequelize, Op, Model } = require("sequelize");
const { exec } = require("child_process");
const fs = require("fs");
const { ref, uploadBytes } = require("firebase/storage");
const storage = require("../utils/uploadtofb");

const notSchema = Joi.object({
  type: Joi.string().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
});
module.exports = {
  async getUsers(req, res) {
    const users = await User.findAll({
      include: [Role],
    });

    res.send(users);
  },
  async notifyFeature(req, res) {
    const not = await Notification.create(req.body);

    const users = await User.findAll();

    users.forEach((user) => {
      UserNotification.create({
        UserId: user.id,
        NotificationId: not.id,
      }).then((un) => {});
      //user.addNotification(not, { through: { selfGranted: false } });
    });

    res.send({
      success: true,
    });

    //res.send(not);
  },
  async backupData(req, res) {
    let dumpFile = "./public/db-backup/dump.sql";

    let exportFrom = {
      host: "localhost",
      user: "root",
      password: "",
      database: "cpdp",
    };

    exec(
      `mysqldump -u${exportFrom.user} ${exportFrom.password} -h${exportFrom.host} --compact ${exportFrom.database} > ${dumpFile}`,
      (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        } else {
          const file = fs.readFileSync("./assets/dump.sql");

          const fileRef = ref(
            storage,
            `/cpdp-db-backups/${new Date().toGMTString()}.sql`
          );

          uploadBytes(fileRef, file).then((result) => {
            res.send({
              success: true,
              message: "Dump file created",
            });
          });
        }
      }
    );
  },
  async getComments(req, res) {
    const comments = await Comment.findAll();

    res.send(comments);
  },
  async generateReport(req, res) {
    var report = req.query.type;

    var fromDateMonth = new Date(req.query.today);

    let fromMonth =
      fromDateMonth.getMonth() + 1 < 10
        ? "0" + (fromDateMonth.getMonth() + 1)
        : fromDateMonth.getMonth() + 1;

    let fromYear = fromDateMonth.getFullYear(); //2022
    let fromDay = fromDateMonth.getDate();

    const yearly = Sequelize.where(
      Sequelize.fn("year", Sequelize.col("createdAt")),
      fromYear
    );
    const monthly = Sequelize.where(
      Sequelize.fn("month", Sequelize.col("createdAt")),
      fromMonth
    );
    const daily = Sequelize.where(
      Sequelize.fn("day", Sequelize.col("createdAt")),
      fromDay
    );

    if (report == "day") {
      const users = await User.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("year", Sequelize.col("user.createdAt")),
              fromYear
            ),
            Sequelize.where(
              Sequelize.fn("month", Sequelize.col("user.createdAt")),
              fromMonth
            ),
            Sequelize.where(
              Sequelize.fn("day", Sequelize.col("user.createdAt")),
              fromDay
            ),
          ],
        },
        include: [Role],
      });
      const products = await Product.findAll({
        where: {
          [Op.and]: [yearly, monthly, daily],
        },
      });
      const comments = await Comment.findAll({
        where: {
          [Op.and]: [yearly, monthly, daily],
        },
      });
      const payments = await Payment.findAll({
        where: {
          [Op.and]: [yearly, monthly, daily],
        },
      });
      //const orders = await User.findAll({
      //    where: {
      //        [Op.and]: [
      //            yearly,
      //            monthly,
      //            daily
      //        ]

      //    },
      //})
      res.send({ users, products, comments, payments });
    } else if (report == "month") {
      const users = await User.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("year", Sequelize.col("user.createdAt")),
              fromYear
            ),
            Sequelize.where(
              Sequelize.fn("month", Sequelize.col("user.createdAt")),
              fromMonth
            ),
          ],
        },
        include: [Role],
      });
      const products = await Product.findAll({
        where: {
          [Op.and]: [yearly, monthly],
        },
      });
      const comments = await Comment.findAll({
        where: {
          [Op.and]: [yearly, monthly],
        },
      });
      const payments = await Payment.findAll({
        where: {
          [Op.and]: [yearly, monthly],
        },
      });
      const orders = await User.findAll({
        where: {
          [Op.and]: [yearly, monthly],
        },
      });
      res.send({ users, products, comments, payments });
    } else {
      const users = await User.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("year", Sequelize.col("user.createdAt")),
              fromYear
            ),
          ],
        },
        include: [Role],
      });
      const products = await Product.findAll({
        where: {
          [Op.and]: [yearly, monthly],
        },
      });
      const comments = await Comment.findAll({
        where: {
          [Op.and]: [yearly],
        },
      });
      const payments = await Payment.findAll({
        where: {
          [Op.and]: [yearly],
        },
      });
      //const orders = await User.findAll({
      //    where: {
      //        [Op.and]: [
      //            yearly,
      //        ]

      //    },
      //})
      res.send({ users, products, comments, payments });
    }
  },
  async getCount(req, res) {
    const users = await Role.findAll({
      include: User,
    });
    const products = await Product.count();

    const reserved = await Product.count({
      where: {
        reserved: true,
        sold: false,
      },
    });
    const sold = await Product.count({
      where: {
        sold: true,
      },
    });
    res.send({
      buyers: users[2].Users.length,
      sellers: users[0].Users.length,
      products,
      reserved,
      sold,
    });
  },
  async updateChatbot(req, res) {
    const cb = await WebChatBot.create(req.body);
    res.send(cb);
  },
  async getChatbot(req, res) {
    const cbs = await WebChatBot.findAll();

    res.send(cbs);
  },
  async getPaymentDetails(req, res) {
    const p = await Account.findAll({
      include: [
        {
          model: User,
          include: [Product],
        },
      ],
    });

    //const ps = await Product.count({
    //  where: {
    //    UserId: p.User.id,
    //  },
    //});
    //console.log(p[0]._previousDataValues);
    res.send({
      payment: p,
    });
  },
};
