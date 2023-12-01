const express = require('express')
const router = express.Router()
const Recipient = require('../models/Recipient')
const RecipientsData = require("../models/RecipientsData")
const Token = require('../models/Token')
const Description = require('../models/Description')
//const { route } = require('./root')

//admin verification of data
router.post(
    '/VerifyData',
    async (req, res, next) => {
        try {
            const {RecipientsDataId} = req.body
            //const user= req.user      
            
            const updatedRecipientsData = await RecipientsData.findOneAndUpdate(
                { _id: recipientDataId, 'User': user },
                { $set: { verified: true } },
                { new: true }
            )
            if (!updatedRecipientData) {
                return res.status(404).json({ success: false, error: 'Recipient Data not found' });
              }
              res.status(201).json({ success: true, RecipientsData:updatedRecipientData });
            } catch (error) {
                console.error(error)
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            }

        }
)

//endpoint to generate json file

router.post(
    '/generateJson',
    async (req, res, next) => {
        try {
           // const user = req.user  
          // Query the database to retrieve the verified data needed for the JSON file
    const verifiedData = await RecipientsData.find({ //User: user, 
        verified: true }).populate('recipient token description classification');

    // Generate JSON file content
    const jsonContent = JSON.stringify(verifiedData, null, 2);

    res.set('Content-Type', 'application/json');
    res.attachment('metadata.json');
    res.send(jsonContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


module.exports = router