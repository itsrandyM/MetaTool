const  mongoose = require ("mongoose")
const User = require("./User")

const recipientSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    name: {
        type:String
    },
    email:{
        type:String
    },
    walletAddress:{
        type: String
    }
    
})
module.exports = mongoose.model('Recipient', recipientSchema)
