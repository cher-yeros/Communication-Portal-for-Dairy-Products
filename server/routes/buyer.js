const express = require('express');
const router = express.Router();

const BuyerController = require('../controllers/buyerController');
const AuthMiddleWare = require('../middlewares/authMiddleware');

router.get('/get-products', AuthMiddleWare.varifyAuth, BuyerController.getProduct)
router.get('/nearby',AuthMiddleWare.varifyAuth, BuyerController.getNearbyProduct)
router.post('/reserve',AuthMiddleWare.varifyAuth, BuyerController.reserve)

module.exports = router;