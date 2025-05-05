const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 👉 /auth/ebay → per iniziare login
router.get('/ebay', authController.getAuthUrl);

// 👉 /auth/ebay/callback → dopo il login eBay
router.get('/ebay/callback', authController.handleCallback);

module.exports = router;
