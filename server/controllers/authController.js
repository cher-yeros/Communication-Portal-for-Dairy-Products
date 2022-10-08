require("dotenv").config();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { User, Role, Account } = require("../models/schema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const id = uuidv4();

const userSchema = Joi.object({
  id: Joi.number(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  address: Joi.string().required(),
  username: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email(),
  role: Joi.string().required(),
});

module.exports = {
  async login(req, res) {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
      include: [Role],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!user) {
      res.send({
        success: false,
        message: "user not found",
      });
    } else {
      const pwdCorrect = await bcrypt.compare(req.body.password, user.password);

      if (pwdCorrect) {
        const roles = user.Roles;
        const userRole = req.body.role;

        var yes = false;

        roles.forEach((role) => {
          if (role.name === userRole) {
            yes = true;
          } else {
            yes = false;
          }
        });

        if (!yes) {
          res.json({
            success: false,
            message: "Permission denied",
          });
        } else {
          jwt.sign({ user }, process.env.ACCESS_TOKEN, function (err, token) {
            if (err) {
              res.send({
                success: false,
                message: err,
              });
            } else {
              var u = user.toJSON();

              u.token = token;
              u.role = req.body.role;

              res.send({
                success: true,
                user: u,
              });
            }
          });
        }
      } else {
        res.send({
          success: false,
          message: "Wrong Password!",
        });
      }
    }
  },
  async createAccount(req, res) {
    const result = userSchema.validate(req.body);

    if (result.error) {
      res.send({
        success: false,
        message: result.error.message,
      });
    } else {
      const u = await User.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (u) {
        res.send({
          success: false,
          message: "Please choose another username",
        });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            req.body.password = hash;
            User.create(req.body).then((user) => {
              Role.findOne({
                where: {
                  name: req.body.role,
                },
              }).then((role) => {
                user.addRole(role, { through: { selfGranted: false } });
                Account.create({
                  UserId: user.id,
                }).then((result) => {
                  res.send({
                    success: true,
                  });
                });
              });
            });
          });
        });
      }
    }
  },
  async editProfile(req, res) {
    const update = await User.update(req.body, {
      where: {
        id: req.body.id,
      },
    });

    if (update[0]) {
      const user = await User.findOne({
        where: { id: req.body.id },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
        include: [Role],
      });
      var u = user.toJSON();

      u.token = req.headers["x-access-token"];
      u.role = req.body.role;

      res.send({
        user: u,
      });
    } else {
      res.send({
        success: false,
        message: "There is something error!",
      });
    }
  },
  async resetPassword(req, res) {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.send({
        success: false,
        message: "Incorrect email",
      });
    } else {
      //let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        //host: "smtp.ethereal.email",
        //port: 587,
        //secure: false, // true for 465, false for other ports
        auth: {
          user: "yerosendiriba1892@gmail.com", // generated ethereal user
          pass: "lpmlkrddqntnssyv", // generated ethereal password
          //user: testAccount.user, // generated ethereal user
          //pass: testAccount.pass, // generated ethereal password
        },
      });

      const key = Math.floor(100000 + Math.random() * 900000);

      // send mail with defined transport object
      transporter.sendMail(
        {
          from: "yerosendiriba1892@gmail.com", // sender address
          to: "yerosendiriba1893@gmail.com", // list of receivers
          subject: "Reset Key for password", // Subject line
          text: "Key for password" + key, // plain text body
          html: "<h4>Password reset key</h4> <h1>" + key + "</h1>", // html body
        },
        function (error, info) {
          console.log(error, "error");
          if (error) {
            console.log("in");
            emailMessage =
              "there was an error :-(, and it was this: " + error.message;
            res.send({
              success: true,
              message: "Server error",
            });
          } else {
            emailMessage = "Message sent: " + info.response;
            console.log(emailMessage);
            res.send({
              success: true,
              key,
            });
          }
        }
      );

      //console.log("Message sent: %s", info);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      //main().catch(console.error);
    }
  },
  async changePassword(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
      include: [Role],
    });

    if (!user) {
      res.send({
        success: false,
        message: "No user registered with this phone!",
      });
    } else {
      if (password.currentPassword) {
        const pwdCorrect = await bcrypt.compare(
          password.currentPassword,
          user.password
        );

        if (!pwdCorrect) {
          res.send({
            success: false,
            message: "Your have entered incorrect old password!",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password.newPassword, salt);

          const result = await User.update(
            {
              password: hash,
            },
            {
              where: {
                id: user.id,
              },
            }
          );

          console.log(result);

          res.send({
            success: result[0] ? true : false,
          });
        }
      }
    }
  },
};
