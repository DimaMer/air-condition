const mongoose = require('mongoose');
const { Schema } = mongoose;


const CategorySchema = new Schema({
  name: {type: String, required: true},
  catId: { type: String, required: true }
});

const Category = mongoose.model('Category', CategorySchema);
exports.Category = Category;
