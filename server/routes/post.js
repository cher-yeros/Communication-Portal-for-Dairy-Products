const express = require("express");
const router = express.Router();
const multer = require("multer");
const uuidv4 = require("uuid");

const PostController = require("../controllers/postController");
const AuthMiddleWare = require("../middlewares/authMiddleware");
const { Product, Account } = require("../models/schema");
const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/store", AuthMiddleWare.varifyAuth, PostController.storePost);
router.get("/get-posts", AuthMiddleWare.varifyAuth, PostController.getPosts);

router.post(
  "/store-feedback",
  AuthMiddleWare.varifyAuth,
  PostController.storeFeedback
);
router.get(
  "/get-feedback",
  AuthMiddleWare.varifyAuth,
  PostController.getFeedback
);
router.get("/get-notified", PostController.getNotification);
router.put("/make-seen", AuthMiddleWare.varifyAuth, PostController.makeSeen);

router.post("/add-product", upload.single("photo"), async (req, res, next) => {
  const photo = req.file.filename;
  req.body.photo = photo;
  const account = await Account.findOne({
    where: {
      UserId: req.body.UserId,
    },
  });
  const fixedPayment = 1.0;

  console.log(account.dataValues);
  const newBalance = account.dataValues.balance - fixedPayment;

  const wd = await account.update({
    balance: newBalance,
  });
  const product = await Product.create(req.body);

  res.send({ success: true });
});

module.exports = router;
