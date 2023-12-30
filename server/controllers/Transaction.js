const Token = require(`../models/Token`)
const Description = require('../models/Description')
const Classification = require('../models/Classification')
const RecipientsData = require('../models/RecipientsData')
const User = require('../models/User')
const Recipient = require('../models/Recipient')

const fs = require('fs');
const path = require('path');
const util = require('util');
const writeFile = util.promisify(fs.writeFile)

const NewTransactionController= {
    addRecipientTransaction: async (req, res) => {
        console.log('Controller received request:', req.body)
        try {
            const { transactionName,transactionDescription ,tokenName,amount,descriptionName, classificationName, name, email, walletAddress,comment,exchangeRates } = req.body
          //const user = req.user  
             
             //const TName = await RecipientsData.create({transactionName,})
            // const TDescription = await RecipientsData.create({transactionDescription,})


          const recipient = await Recipient.create({ //User:User,
            name, email, walletAddress, comment });

          
            const description = await Description.create({descriptionName})
            const token = await Token.create({tokenName, amount})
            const classification = await Classification.create({classificationName})
                
                const loggedInUser = req.user;

            const RecipientData = await RecipientsData.create({
                User: loggedInUser,
                transactionName:transactionName,
                transactionDescription:transactionDescription,
                recipient,
                token,
                description,
                classification,
                exchangeRates:exchangeRates,
                verified: true,
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
      res.status(200).json({ success: true, transactions: userRecipientData, downloadLink:'/downloadRecipientData'  });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },
  downloadRData: async (req, res) => {
    try {
     
      const loggedInUser = req.user;
      const userRecipientData = await RecipientsData.find({ 'User': loggedInUser._id });
  
      const jsonData = JSON.stringify({ success: true, transactions: userRecipientData });
      console.log(jsonData)  

      // Create a unique filename for the downloaded file
      const filename = `recipient_data_${loggedInUser._id}_${Date.now()}.json`;
  
      const filePath = path.join(__dirname, 'downloads', filename);
       console.log(filePath)
       //fs.mkdirSync(path.join(__dirname, 'downloads'))
    
      await writeFile(filePath, jsonData, 'utf8');
  
      // Send the file as a response for download
      res.sendFile(filePath, filename, (err) => {
        // Delete the file after it has been sent
        fs.unlinkSync(filePath);
        if (err) {
          console.error(err);
          res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
  

}

module.exports = NewTransactionController