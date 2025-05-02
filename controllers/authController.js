const ebayAuth = require('../config/ebay-config');

// 1. Genera URL per avviare login OAuth (sandbox)
const getAuthUrl = (req, res) => {
  const scopes = ['https://api.sandbox.ebay.com/oauth/api_scope'];
  const authUrl = ebayAuth.generateUserAuthorizationUrl('SANDBOX', scopes);
  res.redirect(authUrl);
};

// 2. Callback: scambia il codice per un token
const handleCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Authorization code non ricevuto');
  }

  try {
    const token = await ebayAuth.exchangeCodeForAccessToken('SANDBOX', code);
    console.log('✅ Access Token:', token.access_token);
    res.send('✅ Autenticazione completata con successo!');
  } catch (error) {
    console.error('❌ Errore durante lo scambio del codice:', error);
    res.status(500).send('Errore durante lo scambio del codice.');
  }
};

module.exports = {
  getAuthUrl,
  handleCallback,
};
