const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/adminController");
const AuthMiddleWare = require("../middlewares/authMiddleware");

router.get("/users", AuthMiddleWare.varifyAuth, AdminController.getUsers);
router.get("/comments", AuthMiddleWare.varifyAuth, AdminController.getComments);
router.get(
  "/generate-report",
  AuthMiddleWare.varifyAuth,
  AdminController.generateReport
);
router.post(
  "/notify-feature",
  AuthMiddleWare.varifyAuth,
  AdminController.notifyFeature
);
router.post(
  "/backup-data",
  AuthMiddleWare.varifyAuth,
  AdminController.backupData
);
router.post(
  "/update-chatbot",
  AuthMiddleWare.varifyAuth,
  AdminController.updateChatbot
);
router.get("/get-count", AuthMiddleWare.varifyAuth, AdminController.getCount);
router.get("/get-wcb", AuthMiddleWare.varifyAuth, AdminController.getChatbot);
router.get(
  "/payment-detail",
  AuthMiddleWare.varifyAuth,
  AdminController.getPaymentDetails
);

module.exports = router;
