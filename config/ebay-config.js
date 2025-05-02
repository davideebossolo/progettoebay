require('dotenv').config(); // Carica le variabili dal file .env

const eBayAuthToken = require('ebay-oauth-nodejs-client');

// Log di controllo per assicurarti che le variabili siano caricate correttamente
console.log('🟡 EBAY_CLIENT_ID:', process.env.EBAY_CLIENT_ID);
console.log('🟡 EBAY_CLIENT_SECRET:', process.env.EBAY_CLIENT_SECRET);
console.log('🟡 EBAY_REDIRECT_URI:', process.env.EBAY_REDIRECT_URI);

// Costruttore con le credenziali
const ebayAuth = new eBayAuthToken({
  clientId: process.env.EBAY_CLIENT_ID,
  clientSecret: process.env.EBAY_CLIENT_SECRET,
  redirectUri: process.env.EBAY_REDIRECT_URI,
});

module.exports = ebayAuth;
