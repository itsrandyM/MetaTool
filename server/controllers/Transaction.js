const Token = require(`../models/Token`)
const Description = require('../models/Description')
const Classification = require('../models/Classification')
const RecipientsData = require('../models/RecipientsData')
//const User = require('../models/User')

const NewTransactionController= {
    addRecipientTransaction: async (req, res) => {
        console.log('Controller received request:', req.body)
        try {
            const {  tokenName,descriptionName, classificationName } = req.body
          //const user = req.user  

            const description = await Description.create({descriptionName})
            const token = await Token.create({tokenName})
            const classification = await Classification.create({classificationName})
                
            const RecipientData = await RecipientsData.create({
               // User: User,
                token,
                description,
                classification
            })
    
     res.status(201).json({success:true, RecipientData })       

} catch(error){
    console.error(error)
    res.status(500).json({success: false, error:"Internal Server Error"})
}
}
}

module.exports = NewTransactionController