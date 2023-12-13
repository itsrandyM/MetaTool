const express = require('express')
const router = express.Router()
const Recipient = require('../models/Recipient')
const RecipientsData = require("../models/RecipientsData")
const Token = require('../models/Token')
const Description = require('../models/Description')
const authToken = require('../middleware/AuthMW')
//const { route } = require('./root')


// Admin verification of data
router.post('/verifyData', async (req, res, next) => {
  try {
    const { recipientsDataId } = req.body;
    const user = req.user;

    const updatedRecipientsData = await RecipientsData.findOneAndUpdate(
      { _id: recipientsDataId, 'User': user },
      { $set: { verified: true } },
      { new: true }
    );

    if (!updatedRecipientsData) {
      return res.status(404).json({ success: false, error: 'Recipient Data not found' });
    }

    res.status(201).json({ success: true, recipientsData: updatedRecipientsData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Endpoint to generate JSON file
router.post(
  '/generateJson', authToken,
  async (req, res, next) => {
      try {  
         const user = req.user  
         const verifiedData = await RecipientsData.find({ User: user, 
          verified: true })
          //.sort({createdAt: +1})
          .limit(1)
          .populate('recipient token description classification')
  
          if (verifiedData.length === 0) {
              return res.status(404).json({ success: true, error: 'No verified data found',data:[] })
          }
  
  // Generate JSON file content
  const jsonContent = JSON.stringify(verifiedData, null, 2)

    res.set('Content-Type', 'application/json');
    res.attachment('metadata.json');
    res.send(jsonContent);
    //res.json(verifiedData)
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
