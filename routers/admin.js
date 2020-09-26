const route = require('express').Router()
const userRoute = require('./user')
const wacanaRoute = require('./wacana')

route.use('/user', userRoute)
route.use('/wacana', wacanaRoute)
//Tinggal buat artikel, pertanyaan sama nilai

module.exports = route