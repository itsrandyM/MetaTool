const express = require('express')
const router = express.Router()
const Csv = require('../models/csv'); // Assuming correct path to Csv model
const Hash = require('../models/Hash'); // Assuming correct path to Hash model
const Currency = require('../models/Currency')
// import User from '../models/User'
// import Recipient from "./models/Recipient"
// import RecipientsData from '../models/RecipientsData'
// import { Router } from "express"

router.get('/details', async (req, res, next) => {
    try{
        const user = req.user;
        const verifiedData = await Csv.find({ User: user, verified: true})
          .sort({ createdAt: 1 })
          .populate('Hash')
          .populate('Currency')
          .exec()
    
        // if (verifiedData.length === 0) {
        //   return res.status(404).json({ success: true, error: 'No verified data found', data: [] });
        // }
        res.status(200).json({success:true , verifiedData})
    }
    catch(error){
        res.status(404).json({success:false , error, message:"Data Doesn't exist!" })

    }
})

router.post('/addDetails', async (req, res, next) => {
    console.log('DATA:',req.body)
    try{
        const loggedInUser = req.user
        const { localCurrencyName, localCurrencyAmount, localCurrencyUsdRate, TXHash, Wallet  } = req.body

        const currency = new Currency({
            User:loggedInUser,
            localCurrencyName,
            localCurrencyAmount,
            localCurrencyUsdRate,
            localCurrencyUsdAmount: localCurrencyAmount * localCurrencyUsdRate
          })
          await currency.save()
         
        const hash = new Hash({  User:loggedInUser, TXHash, Wallet})
        await hash.save()
        
      
        const CsvDetails = new Csv({
            User: loggedInUser,
            Currency: currency._id,
            Hash:hash._id,
            verified:true

        })
        await CsvDetails.save()

        res.status(201).json({success:true, data:CsvDetails })    

    }
    catch(error){
        console.error(error)
        res.status(500).json({success: false, error:"Internal Server Error"})
    }
})

module.exports = router