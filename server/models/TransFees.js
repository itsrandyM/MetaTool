const  mongoose = require ("mongoose")
const User = require('./User')

const feesSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
   TxFee:{
    type: String
   },
   TxPerRecipient: {
    type:Number
   },
   TxPerRecipientUSD: {
    type:Number
   }

})
module.exports = mongoose.model('Fees', feesSchema)
