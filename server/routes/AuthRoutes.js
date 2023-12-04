const express = require('express')
const router = express.Router()
const {RegisterNewUser,LoginUser} = require('../controllers/Auth')

router.post('/Register',RegisterNewUser)
router.post('/Login',LoginUser)

module.exports = router