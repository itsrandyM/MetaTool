const  mongoose = require ("mongoose")
const User = require('./User')
const { Double } = require("mongodb")

const ratesSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    sourceCurrency:{
        type: String,
       // required: true
    },
    targetCurrency:{
        type: String,
    },
    rateValue:{
        type:Double
    },
    rateDate:{
        type:Date
    },
    amount:{
        type:String
    }

})
module.exports = mongoose.model('Rates', ratesSchema)
