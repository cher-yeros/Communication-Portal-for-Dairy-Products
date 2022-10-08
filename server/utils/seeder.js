const faker = require("faker");
const bcrypt = require("bcrypt");

const {
  User,
  Role,
  Product,
  Payment,
  Comment,
  Notification,
  WebChatBot,
  Help,
  Location,
} = require("../models/schema");

const roles = [
  {
    name: "admin",
  },
  {
    name: "seller",
  },
  {
    name: "buyer",
  },
];

roles.forEach(async (role) => {
  await Role.create(role);
});

const admin = {
  firstname: "Leakemariam",
  avatar: null,
  username: "admin1",
  lastname: "Getu",
  phone: "0921686420",
  email: "leakemariam@gmail.com",
  address: "Hawassa ,Ethiopia",
  login_status: false,
  password: "$2b$10$YIzv1biun9dtagQfeFYXF.GHB4Xtb7yplKU26hJ.hWkQnok6gGOPq", //password
};

User.create(admin).then((user) => {
  Role.findOne({
    where: {
      name: "admin",
    },
  }).then((role) => {
    user.addRole(role, { through: { selfGranted: false } });
  });
});

/*
var users = [];
for (let i = 0; i < 300; i++) {
  name = faker.name.findName();
  var user = {
    firstname: name,
    avatar: null,
    username: faker.internet.userName(name),
    lastname: faker.name.findName(),
    phone: "9" + faker.phone.phoneNumber("!#######"),
    password: "password",
    email: faker.internet.email(),
    address: faker.address.streetName(),
    login_status: faker.datatype.boolean(),
  };
  users.push(user);
}

users.forEach(async (emp) => {
  let users = await User.create(emp); //new User(emp)

  let role1 = await Role.findOne({
    where: {
      name: "seller",
    },
  });

  let role2 = await Role.findOne({
    where: {
      name: "buyer",
    },
  });

  users.addRole(faker.helpers.randomize([role1, role2]), {
    through: { selfGranted: false },
  });
});

var products = [];

for (let i = 0; i < 150; i++) {
  var product = {
    name: faker.commerce.productName(),
    photo: "default.jpg",
    description: faker.commerce.productDescription(),
    quantity: faker.datatype.number(75),
    price: faker.datatype.float({ min: 100, max: 50000 }),
    longitude: faker.datatype.float({ min: -99, max: 99, precision: 0.000001 }),
    latitude: faker.datatype.float({ min: -99, max: 99, precision: 0.000001 }),
    UserId: faker.datatype.number({ min: 1, max: 100 }),
  };

  products.push(product);
}
products.forEach(async (product) => {
  await Product.create(product);
});

var botchats = [];

for (let i = 0; i < 500; i++) {
  var botchat = {
    topic: faker.random.words(4),
  };

  botchats.push(botchat);
}
botchats.forEach(async (botchat) => {
  await WebChatBot.create(botchat);
});

var comments = [];

for (let i = 0; i < 80; i++) {
  var comment = {
    body: faker.commerce.productDescription(),
    UserId: faker.datatype.number({ min: 1, max: 100 }),
  };

  comments.push(comment);
}
comments.forEach(async (comment) => {
  await Comment.create(comment);
});

var nots = [];

for (let i = 0; i < 80; i++) {
  var not = {
    type: faker.finance.transactionType(),
    title: faker.random.words(5),
    body: faker.random.words(12),
  };

  nots.push(not);
}
nots.forEach(async (not) => {
  await Notification.create(not);
});
*/
