const  mongoose = require ("mongoose")
const User = require('./User')

const currencySchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    localCurrencyName:{
        type: String
    },
    localCurrencyAmount:{
        type: Number
    },
    localCurrencyUsdRate:{
        type: Number
    },
    localCurrencyUsdAmount:{
        type: Number
    },
  
 

})
module.exports = mongoose.model('Currency', currencySchema)