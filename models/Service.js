const mongoose = require('mongoose');
const {Schema} = mongoose;

const ServiceSchema = new Schema({
  name: { type: String, required: true  },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  status:{type: Boolean, required: true, default:true}
});
const Service = mongoose.model('Service', ServiceSchema);

exports.Service = Service;

