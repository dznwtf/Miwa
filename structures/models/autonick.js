const mongoose = require("mongoose")

const autoNickSchema = new mongoose.Schema({
    guildId: String,
    auto_nick: String,
});

module.exports = new mongoose.model('autonick', autoNickSchema);