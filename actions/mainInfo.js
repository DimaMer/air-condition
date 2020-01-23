const {validateData} = require('../helpers/dataValidator');
const {Info} = require('../models/MainInfo');
const {unbindImageByAddress} = require('../helpers/unbindImages');
const {updateEntity} = require('../helpers/entityUpdater');

exports.getInfo = async (req, res) =>{
  const foundedInfo = await Info.find();
  res.status(200).json(foundedInfo[0]);
}

exports.addInfo = async (req, res)=>{
  /* Реалізований паттерн singleton. Тобто, якщо сутність вже була
  створена раніше, ми не створюємо нову так як основна інформація
  може бути лише в одному екземплярі
  */
  const exist = await Info.find();
  if(exist.length){
    await unbindImageByAddress(req.files.photo[0].path.split('public')[1]);
    return res.status(200).json(exist[0]);
  }
  const photoFile = req.files.photo;
  if(!(req.files.photo)){
    const err = new Error('Не всі дані введені!');
    err.status = 400;
    throw err;
  }
  await validateData(req);
  const photo = photoFile[0].path.split('public')[1];

  const newInfoData = req.body;
  newInfoData.photo = photo;
  const newInfo = new Info(newInfoData);
  const createdInfo = await newInfo.save();
  res.status(200).json(createdInfo);
}


exports.editInfo = async (req, res) => {
  await validateData(req);
  const id = req.query.id;
  const editedInfo = await updateEntity(id, req, Info);
  if(!editedInfo){
    if(req.files.photo){
      await unbindImageByAddress(req.files.photo[0].path.split('public')[1]);
    }
    const error = new Error('Помилка при виконанні оновлення!');
    error.status = 500;
    throw error;
  }
  if(req.files.photo){
    await unbindImageByAddress(editedInfo.photo);
  }
  res.status(200).send('Success!');
}

exports.deleteInfo = async (req, res) => {
  await validateData(req);
  const deletedInfo = await Info.findByIdAndDelete(req.query.id);
  await unbindImageByAddress(deletedInfo.photo);
  res.status(200).json(deletedInfo);
}
