const mongo = require('mongoose');

let Schema = new mongo.Schema({
    guildid: String,
    user: String,
    content: Array
});

module.exports = mongo.model("warns", Schema);