// routes/transactions.js
const express = require('express');
const Table = require('../models/tableTransact');

const router = express.Router();

// API endpoint to get all transactions
router.get('/getTransactions', async (req, res) => {
  try {
    // Fetch all transactions from the database
    const transactions = await Table.find();

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
