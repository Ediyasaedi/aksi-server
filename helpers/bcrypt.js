const bcrypt = require('bcryptjs')

function hashPassword(password){
    let salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password, hashPwd){
    return bcrypt.compareSync(password, hashPwd)
}

module.exports = { hashPassword, comparePassword }