//var nodemailer = require("nodemailer");
//const { v4: uuidv4 } = require("uuid");
//const uuid = uuidv4();

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main;

//main().catch(console.error);

////var transporter = nodemailer.createTransport({
////  service: "gmail",
////  auth: {
////    user: "yerosendiriba1892@gmail.com",
////    pass: "mygmailpwd1892",
////  },
////});

//let testAccount;
//nodemailer.createTestAccount().then((res) => {
//  testAccount = res;
//});

//// create reusable transporter object using the default SMTP transport
//let transporter = nodemailer.createTransport({
//  host: "smtp.ethereal.email",
//  port: 587,
//  secure: false, // true for 465, false for other ports
//  auth: {
//    user: testAccount?.user, // generated ethereal user
//    pass: testAccount?.pass, // generated ethereal password
//  },
//});

//console.log(testAccount);

//let info;
//transporter
//  .sendMail({
//    from: '"Fred Foo 👻" <foo@example.com>', // sender address
//    to: "yerosendiriba0@gmail.com", // list of receivers
//    subject: "Hello ✔", // Subject line
//    text: "Hello world?", // plain text body
//    html: "<b>Hello world?</b>", // html body
//  })
//  .then((res) => {
//    info = res;
//  });
//var mailOptions = {
//  from: "yerosendiriba1892@gmail.com",
//  to: "yerosendiriba0@yahoo.com",
//  subject: "Sending Email using Node.js",
//  text: "That was easy!",
//};

////transporter.sendMail(mailOptions, function (error, info) {
////  if (error) {
////    console.log(error);
////  } else {
////    console.log("Email sent: " + info.response);
////  }
////});

//module.exports = info;
