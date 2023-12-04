const express = require('express')
const router = express.Router()
const authToken = require('../middleware/AuthMW')
const NewTransactionController = require('../controllers/Transaction')

router.post('/addRecipientTransaction',authToken,NewTransactionController.addRecipientTransaction)

module.exports = router