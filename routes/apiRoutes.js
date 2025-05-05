const express = require('express');
const router = express.Router();
const axios = require('axios');
const tokenStore = require('../tokenStore');

// 👉 Crea un inventario di test su eBay sandbox
router.post('/api/inventory/create', async (req, res) => {
  const accessToken = tokenStore.get();
  if (!accessToken) return res.status(401).send('⚠️ Effettua prima il login eBay.');

  const sku = 'TESTSKU-' + Date.now();

  const data = {
    product: {
      title: "Prodotto di test",
      description: "Questo è un test dal sandbox",
      aspects: {
        Brand: ["TestBrand"]
      },
      imageUrls: [
        "https://via.placeholder.com/300"
      ]
    },
    condition: "NEW",
    availability: {
      shipToLocationAvailability: {
        quantity: 5
      }
    }
  };

  try {
    const response = await axios.put(
      `https://api.sandbox.ebay.com/sell/inventory/v1/inventory_item/${sku}`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    );

    res.send({
      message: '✅ Inventario creato',
      sku,
      ebayResponse: response.data
    });
  } catch (err) {
    console.error('❌ Errore chiamata eBay:', err.response?.data || err.message);
    res.status(500).send('Errore nella creazione dell’inventario');
  }
});

module.exports = router;
