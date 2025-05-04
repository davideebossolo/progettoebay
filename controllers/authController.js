const ebayAuth = require('../config/ebay-config');

// 👉 Genera l’URL di autorizzazione e reindirizza a eBay
const getAuthUrl = (req, res) => {
  const scopes = ['https://api.sandbox.ebay.com/oauth/api_scope'];

  console.log('🔍 Chiamo generateUserAuthorizationUrl con:');
  console.log('→ Client ID:', process.env.EBAY_CLIENT_ID);
  console.log('→ Secret:', process.env.EBAY_CLIENT_SECRET);
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

const handleCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Authorization code mancante');
  }

  try {
    // Scambio code → token
    const token = await ebayAuth.exchangeCodeForAccessToken('SANDBOX', code);

    // Su ebay‑oauth‑nodejs‑client ≥ 2.x le info sono in token.body
    const accessToken  = token.access_token  || token.body?.access_token;
    const refreshToken = token.refresh_token || token.body?.refresh_token;
    const expiresIn    = token.expires_in    || token.body?.expires_in;

    console.log('✅ Access Token:', accessToken);

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
