const express = require('express');
const app = express();
require('dotenv').config();

// Importa le rotte
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Collega le rotte su percorsi distinti
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Porta dinamica (Render imposta process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server attivo sulla porta ${PORT}`);
});
