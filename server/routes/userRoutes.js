const express = require('express')
const router = express.Router()
const usersController = require('../controller/userController')

router.route('/')
    .get(usersController.getAllUsers)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router