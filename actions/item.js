const { Item } = require('../models/Item');

exports.getItemList = async (req, res) =>{
    ItemList =  await Item.find();
  res.status(200).json(ItemList);
}

exports.getSingleItem = async (req, res) =>{
  if(!req.query.id){
    const err = new Error('Не введено id Item!');
    err.status = 404;
    throw err;
  }
  const FoundedItem = await Item.findById(req.query.id);
  res.status(200).json(FoundedItem);
}

exports.addItem = async (req, res)=>{
  if( !req.body.name || !req.body.phone ){
    const err = new Error('Не всі дані введені!');
    err.status = 404;
    throw err;
  }

  let foundedItem = await Item.findOneAndUpdate({phone:req.body.phone},
                                                    req.body, {new: true});
  if( foundedItem ){
    return res.status(200).json(foundedItem);
  }

  const newItem = await new Item(req.body);
  if(!newItem){
    const err = new Error('Нового Item не додано!');
      err.status = 404;
      throw err;
  }
  const createdItem = await newItem.save();
  res.status(200).json(createdItem);
}

exports.editItem = async (req, res) => {
  const id = req.query.id;
  if(!id){
    const error = new Error('Не вказаний id');
    error.status(404);
    throw error;
  }
  const updateObj = req.body;

  const foundedItem = await Item.findByIdAndUpdate(id, updateObj, {new: true});
  res.status(200).json(foundedItem);
}

exports.deleteItem = async (req, res) => {
  if(!req.query.id){
    const err = new Error('Не введений id!');
    err.status = 404;
    throw err;
  }
  const deletedItem = await Item.findByIdAndDelete(req.query.id);
  res.status(200).json(deletedItem);
}


