const ebayAuth = require('../config/ebay-config');
const tokenStore = require('../tokenStore');

// 👉 Genera l’URL di autorizzazione e reindirizza a eBay
const getAuthUrl = (req, res) => {
  const scopes = ['https://api.sandbox.ebay.com/oauth/api_scope'];

  console.log('🔍 Chiamo generateUserAuthorizationUrl con:');
  console.log('→ Client ID:', process.env.EBAY_CLIENT_ID);
  console.log('→ Secret:', process.env.EBAY_CLIENT_SECRET?.slice(0, 10) + '…');
  console.log('→ Redirect URI:', process.env.EBAY_REDIRECT_URI);

  try {
    const authUrl = ebayAuth.generateUserAuthorizationUrl('SANDBOX', scopes);
    console.log('🔗 Redirecting to:', authUrl);
    res.redirect(authUrl);
  } catch (err) {
    console.error('❌ ERRORE generateUserAuthorizationUrl:', err.message);
    res.status(500).send('Errore OAuth: ' + err.message);
  }
};

// 👉 Callback dopo login
const handleCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('Authorization code mancante');

  try {
    // 1. Ottieni la risposta
    const response = await ebayAuth.exchangeCodeForAccessToken('SANDBOX', code);
    // 2. Estrarre sempre da response.body
    const { access_token, refresh_token, expires_in } = response.body;

    if (!access_token) {
      console.error('❌ access_token assente nella risposta:', response.body);
      return res.status(500).send('Token assente nella risposta eBay');
    }

    // 3. Salva in RAM
    tokenStore.set(access_token);
    console.log('✅ Access Token salvato:', access_token);

    res.send(`
      <h2>✅ Login completato con successo!</h2>
      <p><strong>Access Token:</strong> ${access_token}</p>
      <p><strong>Scade tra:</strong> ${expires_in} secondi</p>
    `);
  } catch (err) {
    console.error('❌ Errore callback:', err.response?.data || err);
    res.status(500).send('Errore nello scambio del codice con eBay');
  }
};


module.exports = {
  getAuthUrl,
  handleCallback,
};
