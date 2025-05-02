const express = require('express');
const router = express.Router();
const { getAuthUrl, handleCallback } = require('../controllers/authController');

router.get('/auth/ebay', getAuthUrl);
router.get('/auth/ebay/callback', handleCallback);

module.exports = router;
