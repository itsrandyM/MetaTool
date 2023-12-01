const express = require('express')
const router = express.Router()
const Recipient = require('../models/Recipient');
const NewTransactionController = require('../controllers/Transaction');
//const User = require('../models/User');

//Add recipient route
router.post('/addRecipient', async (req, res, next) => {
    try {
        const { name, email, walletAddress } = req.body;
        const recipient = await Recipient.create({ //User:User,
             name, email, walletAddress });

    // const recipientId = recipient._id
    // req.body.recipientId = recipientId
    //await NewTransactionController.addRecipientTransaction(req, res)

        res.json({ success: true, recipient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router