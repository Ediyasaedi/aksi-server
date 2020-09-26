const route = require('express').Router()
const adminRoute = require('./admin')
const UserController = require('../controllers/userController')
const { adminAuthentication } = require('../middlewares/adminAuthentication')

route.post('/login', UserController.login)
route.use('/admin', adminAuthentication, adminRoute)

module.exports = route