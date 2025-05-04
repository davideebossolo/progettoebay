const ebayAuth = require('../config/ebay-config');

// 👉 Genera l’URL di autorizzazione e reindirizza a eBay
const getAuthUrl = (req, res) => {
  const scopes = ['https://api.sandbox.ebay.com/oauth/api_scope']; // Puoi aggiungere altri se ti servono
  const authUrl = ebayAuth.generateUserAuthorizationUrl('SANDBOX', scopes);

  console.log('🔗 Redirecting user to eBay OAuth:', authUrl);
  res.redirect(authUrl);
};

// 👉 Callback: riceve il codice da eBay e lo scambia per un access_token
const handleCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    console.error('❌ Authorization code mancante!');
    return res.status(400).send('Authorization code mancante');
  }

  try {
    const token = await ebayAuth.exchangeCodeForAccessToken('SANDBOX', code);
    
    console.log('✅ Access Token:', token.access_token);
    console.log('🔐 Refresh Token:', token.refresh_token); // opzionale

    res.send(`
      <h2>✅ Login completato con successo!</h2>
      <p><strong>Access Token:</strong> ${token.access_token}</p>
      <p><strong>Scade tra:</strong> ${token.expires_in} secondi</p>
    `);
  } catch (error) {
    console.error('❌ Errore nello scambio del codice:', error);
    res.status(500).send('Errore durante lo scambio del codice con eBay.');
  }
};

module.exports = {
  getAuthUrl,
  handleCallback,
};
