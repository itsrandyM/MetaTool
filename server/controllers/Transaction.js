const Token = require(`../models/Token`)
const Description = require('../models/Description')
const Classification = require('../models/Classification')
const RecipientsData = require('../models/RecipientsData')
const User = require('../models/User')
const Recipient = require('../models/Recipient')

const NewTransactionController= {
    addRecipientTransaction: async (req, res) => {
        console.log('Controller received request:', req.body)
        try {
            const { transactionName,transactionDescription ,tokenName,descriptionName, classificationName, name, email, walletAddress } = req.body
          //const user = req.user  
             
             const TName = await RecipientsData.create({transactionName,})
             const TDescription = await RecipientsData.create({transactionDescription,})


          const recipient = await Recipient.create({ //User:User,
            name, email, walletAddress });

          
            const description = await Description.create({descriptionName})
            const token = await Token.create({tokenName})
            const classification = await Classification.create({classificationName})
                
                const loggedInUser = req.user;

            const RecipientData = await RecipientsData.create({
                User: loggedInUser,
                TName,
                TDescription,
                recipient,
                token,
                description,
                classification
            })
    
     res.status(201).json({success:true, RecipientData })       

} catch(error){
    console.error(error)
    res.status(500).json({success: false, error:"Internal Server Error"})
}
},
 getRecipientData:  async (req, res) => {
    try {
     console.log('Logged-in User:', req.user)
      const loggedInUser = req.user;
  
      // Fetch recipient data associated with the logged-in user from the database
      const userRecipientData = await RecipientsData.find({ 'User': loggedInUser._id });
  
      // Return the data as a JSON response
      res.status(200).json({ success: true, transactions: userRecipientData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

}

module.exports = NewTransactionController