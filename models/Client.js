const mongoose = require('mongoose');
const {Schema} = mongoose;

const ClientSchema = new Schema({
  name: { type: String, required: true  },
  phone: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
});
const Client = mongoose.model('Client', ClientSchema);

exports.Client = Client;
