const eBayAuthToken = require('ebay-oauth-nodejs-client');

// Log di debug per confermare lettura delle variabili
console.log('🟡 EBAY_CLIENT_ID:', process.env.EBAY_CLIENT_ID || '❌ MANCANTE');
console.log('🟡 EBAY_CLIENT_SECRET:', process.env.EBAY_CLIENT_SECRET || '❌ MANCANTE');
console.log('🟡 EBAY_REDIRECT_URI:', process.env.EBAY_REDIRECT_URI || '❌ MANCANTE');

// Crea l'istanza del client eBay OAuth
const ebayAuth = new eBayAuthToken({
  clientId: process.env.EBAY_CLIENT_ID,
  clientSecret: process.env.EBAY_CLIENT_SECRET,
  redirectUri: process.env.EBAY_REDIRECT_URI,
});

module.exports = ebayAuth;
