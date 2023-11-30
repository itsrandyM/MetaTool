const  mongoose = require ("mongoose")
const User = require('./User')

const tokenSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    tokenName:{
        type: String
    }

})
module.exports = mongoose.model('Token', tokenSchema)
