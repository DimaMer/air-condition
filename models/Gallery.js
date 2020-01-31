const mongoose = require('mongoose');
const {Schema} = mongoose;
const {Item} = require('./Item');

const GallerySchema = new Schema({
  photo: { type: String, required: true },
  isActive:{ type: Boolean, required: true, default:false },
  description:{ type: String }
});





const Gallery = mongoose.model('Gallery', GallerySchema);

exports.Gallery = Gallery;
