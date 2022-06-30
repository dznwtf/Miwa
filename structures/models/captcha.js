const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    GuildId: String,
})

module.exports = mongoose.model('captcha', schema)