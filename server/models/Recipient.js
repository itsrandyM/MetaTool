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
    org:{
        type:String
    },
    comment:{
        type:String
    },
    token1:{
        type: String
    },
    amount1:{
        type: String
    },
    token2:{
        type: String
    },
    amount2:{
        type: String
    },
    
},
{
    timestamps: true
 }
 )
module.exports = mongoose.model('Recipient', recipientSchema)
