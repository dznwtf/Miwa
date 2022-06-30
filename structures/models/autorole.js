const mongoose = require("mongoose")

const autoRoleSchema = new mongoose.Schema({
    Role: {
        type: String,
        unique: true,
        required: true,
    },
    GuildID: {
        type: String,
        unique: true,
        required: true,
    },
});

module.exports = new mongoose.model('autorole', autoRoleSchema);