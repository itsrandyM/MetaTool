const express = require('express')
const router = express.Router()
const Recipient = require('../models/Recipient')
const RecipientsData = require("../models/RecipientsData")
const Token = require('../models/Token')
const Description = require('../models/Description')
const authToken = require('../middleware/AuthMW')
const { sanitizeFilter } = require('mongoose')
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
router.post('/generateJson', authToken, async (req, res, next) => {
  try {
    const user = req.user;
    const verifiedData = await RecipientsData.find({ User: user, verified: true })
      .limit(1)
      .sort({ createdAt: -1 })
      .populate('classification token description recipients');

    if (verifiedData.length === 0) {
      return res.status(404).json({ success: true, error: 'No verified data found', data: [] });
    }

    // Function to recursively remove "_id" and "__v" fields from an object
    const removeIdFields = (obj) => {
      if (obj && typeof obj.toObject === 'function') {
        obj = obj.toObject(); // Convert Mongoose document to plain object
      }
    
      const sanitizedObj = { ...obj };
      delete sanitizedObj._id;
      delete sanitizedObj.__v;

      if (sanitizedObj.createdAt instanceof Date) {
        sanitizedObj.createdAt = sanitizedObj.createdAt.toISOString();
      }
    
      if (sanitizedObj.updatedAt instanceof Date) {
        sanitizedObj.updatedAt = sanitizedObj.updatedAt.toISOString();
      }
    
      // Recursively remove "_id" and "__v" fields from nested objects
      Object.keys(sanitizedObj).forEach((key) => {
        if (sanitizedObj[key] && typeof sanitizedObj[key] === 'object') {
          sanitizedObj[key] = removeIdFields(sanitizedObj[key]);
        }
      });

      return sanitizedObj;
    };

    // Remove "_id" and "__v" fields from the entire structure
    const sanitizedData = verifiedData.map((item) => {
      const sanitizedItem = removeIdFields(item);

      // Additional removal for nested "recipients," "token," "description," and "classification"
      if (Array.isArray(sanitizedItem.recipients)) {
        sanitizedItem.recipients = sanitizedItem.recipients.map((recipient) => {
          return removeIdFields(recipient);
        });
      }
   
      if (Array.isArray(sanitizedItem.token)) {
        sanitizedItem.token = sanitizedItem.token.map((token) => {
          return removeIdFields(token);
        });
      }
      sanitizedItem.description = removeIdFields(sanitizedItem.description);
      sanitizedItem.classification = removeIdFields(sanitizedItem.classification);

      return sanitizedItem;
    });

    // Generate JSON file content
    const jsonContent = JSON.stringify(sanitizedData, null, 2);

    res.set('Content-Type', 'application/json');
    res.attachment('metadata.json');
    res.send(jsonContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


module.exports = router;
