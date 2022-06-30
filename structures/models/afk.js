const {
    model,
    Schema
} = require("mongoose")

module.exports = new model('AFK', new Schema({
    // GuildID: String,
    UserID: String,
    Status: String,
    Time: String
}));