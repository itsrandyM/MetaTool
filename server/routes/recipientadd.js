const express = require('express')
const router = express.Router()
const Recipient = require('../models/Recipient');
//const User = require('../models/User');

//Add recipient route
router.post('/addRecipient', async (req, res, next) => {
    try {
        const { name, email, walletAddress } = req.body;

        // If you don't have user authentication, you can create a recipient without associating it with a user
        const recipient = await Recipient.create({ //User:User,
             name, email, walletAddress });

        res.json({ success: true, recipient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router