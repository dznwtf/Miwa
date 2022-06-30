const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild: String,
    Channel: String,
    WelcomeMsg: String,
});

module.exports = mongo.model("welcome-channel", Schema);