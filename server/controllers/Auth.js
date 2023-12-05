const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @desc Get all users
// @route GET /users
// @access Private/Admin


// @desc Create new user
// @route POST /users
// @access Private
const RegisterNewUser = asyncHandler(async (req, res) => {
    const { username, email ,password, roles } = req.body

    // Confirm data
    if (!username || !email ||!password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, email, "password": hashedPwd, roles }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})


//Login

const LoginUser = asyncHandler(async (req, res) => {
   
    try{
        const { username, email ,password } = req.body
        const user = await User.findOne({ email }).exec()
    // Confirm data
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

     if (!user) {
        return res.status(401).json({ status: 401, message: 'Invalid email' });
    } else if (!user.username || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ status: 401, message: 'Invalid password' });
    }
    //(user && (await bcrypt.compare(password, user.password)))
    
    
    
    


const token = jwt.sign({
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
    roles: user.roles,
}, process.env.JWT_SECRET) 
res.json({
    success:true,
    message:'Login successful',
    token
})
}catch(error){
    console.error("Error logging in:",error.message)
    res.status(500).json({success:false,error:'Internal Server Error'})
}
})



module.exports =exports = {
    RegisterNewUser,
    LoginUser
}