const  mongoose = require ("mongoose")

const userSchema = new mongoose.Schema({
    displayName:{
        type:String,
        required:true,
    },
    email: {
       type:String,
       required:true
    },
    position:{
        type:String,
    },
    password:{
        type:String
    }
})
module.exports = mongoose.model('User', userSchema)