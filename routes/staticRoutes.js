// routes/staticRoutes.js
const express = require('express');
const router = express.Router();

router.get('/privacy', (req, res) => {
  res.type('html').send(`
    <h1>Privacy Policy - progettoEbay</h1>
    <p>Questa è una policy di esempio per il testing in sandbox.</p>
    <p>Descrivi qui come tratti i dati degli utenti.</p>
  `);
});

module.exports = router;
