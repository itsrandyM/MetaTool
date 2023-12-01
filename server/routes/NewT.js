const express = require('express')
const router = express.Router()
const NewTransactionController = require('../controllers/Transaction')

router.post('/addRecipientTransaction', NewTransactionController.addRecipientTransaction)

module.exports = router