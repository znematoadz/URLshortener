
const mongo = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');


let connection = mongoose.connect(process.env.MONGO_URI);
autoIncrement.initialize(connection);

var urlSchema = new Schema ({
  originalUrl : {type: String, required: true},
  shortUrl : {type: String, required: true},
  newUrl : String
});

urlSchema.plugin(autoIncrement.plugin, { model: 'urlShortener', field: 'shortUrl' })


module.exports = connection.model('urlShortener', urlSchema)