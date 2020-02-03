const mongoose = require('mongoose');
const {Schema} = mongoose;

const ItemSchema = new Schema({
    title: { type: String, required: true  },
    subTitle: { type: String  },
    description: { type: String, required: true },
    photo: { type: String, required: true },
    price:  {type: Number, required: true },
    notes: {type: String, required: true },
    isActive: {type: Boolean, required: true, default: false},
    date: { type: Date, required: true, default: Date.now },
});
const Item = mongoose.model('Item', ItemSchema);

exports.Item = Item;

