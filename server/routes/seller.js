const express = require('express');
const router = express.Router();

const SellerController = require('../controllers/sellerController');
const AuthController = require('../controllers/authController');
const AuthMiddleWare = require('../middlewares/authMiddleware');

router.post('/add-product', AuthMiddleWare.varifyAuth, SellerController.postProduct)
router.put('/update-profile', AuthMiddleWare.varifyAuth, AuthController.editProfile)
router.get('/get-my-product', AuthMiddleWare.varifyAuth, SellerController.getMyProduct)
router.get('/get-my-reserved', AuthMiddleWare.varifyAuth, SellerController.getMyReserved)
router.get('/get-my-sold', AuthMiddleWare.varifyAuth, SellerController.getMySold)
router.post('/sell', AuthMiddleWare.varifyAuth, SellerController.sell)
router.post('/release', AuthMiddleWare.varifyAuth, SellerController.release)
router.get('/seller-counter', AuthMiddleWare.varifyAuth, SellerController.getMyCount)


module.exports = router;