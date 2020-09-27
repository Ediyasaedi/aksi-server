const route = require('express').Router()
const userRoute = require('./user')
const wacanaRoute = require('./wacana')
const artcleRoute = require('./article')
const questionRoute = require('./question')

route.use('/user', userRoute)
route.use('/wacana', wacanaRoute)
//Tinggal buat artikel, pertanyaan sama nilai
route.use('/article', artcleRoute)
route.use('/question', questionRoute)

module.exports = route