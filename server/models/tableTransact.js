// models/transaction.js
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  transactionName: String,
  recipientName: String,
  token: String,
  classification: String,
  description: String,
  timestamp: Date,
});



module.exports =  mongoose.model('Table', tableSchema);
