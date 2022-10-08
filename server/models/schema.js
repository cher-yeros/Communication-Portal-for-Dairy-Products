const { DataTypes } = require("sequelize");
const connect = require("../utils/DBConnection");

const connection = require("../utils/DBConnection");

const User = connection.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  login_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
const Product = connection.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DOUBLE,
  },
  longitude: {
    type: DataTypes.DOUBLE,
  },
  sold: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  reserved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const Role = connection.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const WebChatBot = connection.define("WebChatBot", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cbid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  trigger: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  options: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const value = this.getDataValue("options");
      let ops = [];

      let options = this.getDataValue("options").split(";");

      options.forEach((op) => {
        ops.push(JSON.parse(op));
      });
      value.optionss = ops;
      return value.split(";");
      //return this.getDataValue("options").split(";");
    },
    set(value) {
      let options = [];
      value.forEach((op) => {
        options.push(JSON.stringify(op));
      });

      this.setDataValue("options", options.join(";"));
    },
  },
});

const Comment = connection.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

const Payment = connection.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ammount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

const Notification = connection.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const UserNotification = connect.define("UserNotification", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

const Help = connection.define("Help", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Account = connection.define("Account", {
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  balance: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 1000.0,
  },
});

const UserRole = connection.define("UserRole", {}, { timestamps: false });

//creating association between tables
User.belongsToMany(Role, { through: "UserRole" });
Role.belongsToMany(User, { through: "UserRole" });

//User.belongsToMany(Notification, { through: "UserNotification" });
//Notification.belongsToMany(User, { through: "UserNotification" });

User.hasMany(UserNotification);
Notification.hasMany(UserNotification);
UserNotification.belongsTo(Notification);

User.hasMany(Payment);
User.hasOne(Account);
Account.belongsTo(User);

User.hasMany(Product);
Product.belongsTo(User);

Comment.belongsTo(User);

module.exports.User = User;
module.exports.UserNotification = UserNotification;
module.exports.Role = Role;
module.exports.Product = Product;
module.exports.WebChatBot = WebChatBot;
module.exports.Comment = Comment;
module.exports.Payment = Payment;
module.exports.Notification = Notification;
module.exports.Help = Help;
module.exports.Account = Account;

//connection.sync({ force: true });
