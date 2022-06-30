const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild: String,
    Channel: String,
    Delay: String
});

module.exports = mongo.model("AutoDelete", Schema);