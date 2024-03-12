const express = require('express')
const router = express.Router()
const authToken = require('../middleware/AuthMW')
const NewTransactionController = require('../controllers/Transaction')

router.post('/addRecipientTransaction',authToken,NewTransactionController.addRecipientTransaction)
router.get('/getRecipientTransactions',authToken,NewTransactionController.getRecipientData)
router.get('/downloadRecipientData/:selectedTransctionId',authToken,NewTransactionController.downloadRData)
router.get('/getRecipientTransaction/:id',authToken,NewTransactionController.getDataById)
router.post('/addHash',authToken,NewTransactionController.addHash)


module.exports = router