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
  if (!code) {
    return res.status(400).send('Authorization code mancante');
  }

  try {
    // Scambia il codice con il token
    const response = await ebayAuth.exchangeCodeForAccessToken('SANDBOX', code);
    const token = response.body;

    const accessToken = token.access_token;
    const refreshToken = token.refresh_token;
    const expiresIn = token.expires_in;

    // ✅ Salva il token
    tokenStore.set(accessToken);

    console.log('✅ Access Token salvato:', accessToken);
    console.log('⏳ Scade tra:', expiresIn, 'secondi');

    res.send(`
      <h2>✅ Login completato con successo!</h2>
      <p><strong>Access Token:</strong> ${accessToken}</p>
      <p><strong>Scade tra:</strong> ${expiresIn} secondi</p>
    `);
  } catch (err) {
    console.error('❌ Errore nello scambio del codice:', err.response?.data || err);
    res.status(500).send('Errore nello scambio del codice con eBay');
  }
};

module.exports = {
  getAuthUrl,
  handleCallback,
};
