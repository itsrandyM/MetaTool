const express = require('express')
const router = express.Router()
const Recipient = require('../models/Recipient')
const RecipientsData = require("../models/RecipientsData")
const Token = require('../models/Token')
const Description = require('../models/Description')
//const { route } = require('./root')


// Add recipient route
router.post('/addRecipient', async (req, res, next) => {
  try {
    const { name, email, walletAddress } = req.body;
    const user = req.user; // Authenticate

    const recipient = await Recipient.create({ User: user, name, email, walletAddress });

    res.json({ success: true, recipient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Add recipient data / Transaction details route
router.post('/addRecipientTransaction', async (req, res, next) => {
  try {
    const { name, tokenName, descriptionName, classificationName } = req.body;
    const user = req.user; // Authenticate later

    const token = await Token.findOneOrCreate({ user: user, tokenName });
    const description = await Description.findOneOrCreate({ user: user, descriptionName });
    const classification = await Classification.findOneOrCreate({ user: user, classificationName });

    const recipientsData = await RecipientsData.create({
      User: user,
      name,
      token,
      description,
      classification,
    });

    res.json({ success: true, recipientsData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

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
  '/generateJson',
  async (req, res, next) => {
      try {  
      // const user = req.user  
         const verifiedData = await RecipientsData.find({ //User: user, 
          verified: true })
          //.sort({createdAt: +1})
          .limit(1)
          .populate('recipient token description classification')
  
          if (verifiedData.length === 0) {
              return res.status(404).json({ success: false, error: 'No verified data found' })
          }
  
  // Generate JSON file content
  const jsonContent = JSON.stringify(verifiedData, null, 2)

  res.set('Content-Type', 'application/json')
  res.attachment('metadata.json')
  res.send(jsonContent)
} catch (error) {
  console.error(error)
  res.status(500).json({ success: false, error: 'Internal Server Error' })
}
})
module.exports = router;
