const { Item } = require('../models/Item');
const {updateEntity} = require('../helpers/entityUpdater');
const {validateData} = require('../helpers/dataValidator');
const {unbindImageByAddress} = require('../helpers/unbindImages');

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


  // let foundedItem = await Item.findOneAndUpdate({title:req.body.title},
  //                                                   req.body, {new: true});
  //
  //
  // if( foundedItem ){
  //   return res.status(200).json(foundedItem);
  // }

  const newItem = await new Item(req.body);
  newItem.photo = req.files.photo.image.url


  if(!newItem){
    const err = new Error('Нового Item не додано!');
      err.status = 404;
      throw err;
  }
  const createdItem = await newItem.save();
  res.status(200).json(createdItem);
}

exports.editItem = async (req, res) => {
  await validateData(req);
  const {id} = req.body;
  const itemFile = req.files.photo;
  const itemOld = await Item.find({_id: id})
  const editedItem = await updateEntity(id, req, Item);
  if (!editedItem) {
    if (itemFile) {
      await unbindImageByAddress(itemFile[0].path || itemFile);
    }
    const error = new Error('Помилка при виконанні оновлення!');
    error.status = 500;
    throw error;
  } else if (itemFile&&itemOld[0]&&itemOld[0].photo) {
    await unbindImageByAddress(itemOld[0].photo);
  }
  res.status(200).send('Success!');
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


