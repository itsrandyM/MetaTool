const  mongoose = require ("mongoose")
const User = require('./User')
const Hash = require("./Hash")
const Recipient = require("./Recipient")
const RecipientData = require('./RecipientsData')
const Currency = require("./Currency")

const csvSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    Hash: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Hash
    },
    Recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Recipient
    },
    Currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Currency
    },
  
    RecipientData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: RecipientData
    },

    verified: {
        type: Boolean,
        default: true, 
      }
  
    
   
 

})
module.exports = mongoose.model('Csv', csvSchema)
  // exchangeRates: {
    //     type:[exchangeRates],
    //     ref: RecipientsData
    // },