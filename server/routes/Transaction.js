const express = require('express')
const router = express.Router()
const Recipient = require('../models/Recipients')
const RecipientsData = require("../models/RecipientsData")
const Token = require('../models/Token')
const Description = require('../models/Description')
const RecipientsData = require('../models/RecipientsData')
const { route } = require('./root')

//Add recipient route
router.post(
    '/addRecipient',
    async (req, res, next) => {
        try {
            const { name, email, walletAddress} = req.body
            const user = req.user//authenticate
         
             const recipient = await Recipient.create({User:user, name, email, walletAddress})   
             
             res.json({success:true, recipient})
    }catch(error){
    console.error(error)
    res.status(500).json({success: false, error:"Internal Server Error"})
}}
)

// Add recipient data / Transaction details route

router.post(
    '/addRecipientTransaction',
    async (req, res, next) => {
        try {
            const { name,  
                    tokenName,
                    descriptionName,
                    classificationName} = req.body
            const user = req.user//authenticate later

const token = await Token.findOneOrCreate({user:user, tokenName})
const description = await Description.findOneOrCreate({user:user, descriptionName})
const classification = await Classification.findOneOrCreate({user:user, classificationName}) 

const RecipientsData = await RecipientsData.create({
    User:user,
    name,
    token,
    description,
    classification
})

res.json({success:true, RecipientsData})


}catch(error){
    console.error(error)
    res.status(500).json(json({success: false, error:"Internal Server Error"})
)}
})

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
            const user = req.user  
          // Query the database to retrieve the verified data needed for the JSON file
    const verifiedData = await RecipientData.find({ User: user, verified: true }).populate('recipient token description classification');

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