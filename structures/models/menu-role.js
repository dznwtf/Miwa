const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    guildId: String,
    roles: Array
});

module.exports = mongoose.model('Menu-Roles', Schema);