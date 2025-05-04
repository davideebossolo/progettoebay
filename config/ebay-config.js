const eBayAuthToken = require('ebay-oauth-nodejs-client');

const ebayAuth = new eBayAuthToken({
  clientId: process.env.EBAY_CLIENT_ID,
  clientSecret: process.env.EBAY_CLIENT_SECRET,
  redirectUri: process.env.EBAY_REDIRECT_URI,
  env: 'SANDBOX' // 👈 forza l'ambiente corretto
});

module.exports = ebayAuth;
