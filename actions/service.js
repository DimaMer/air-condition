const { Service } = require('../models/Service');

exports.getServiceList = async (req, res) =>{
  let ServiceList = null;
  if(req.query.status == 'true'){
    ServiceList =  await Service.find({active: true});
  }else if(req.query.status == 'false'){
    ServiceList =  await Service.find({active: false});
  }else{
    ServiceList =  await Service.find();
  }
  res.status(200).json(ServiceList);
}

exports.getSingleService = async (req, res) =>{
  if(!req.query.id){
    const err = new Error('Не введено id service!');
    err.status = 404;
    throw err;
  }
  const FoundedService = await Service.findById(req.query.id);
  res.status(200).json(FoundedService);
}

exports.addService = async (req, res)=>{
  if( !req.body.name || !req.body.minPrice|| !req.body.maxPrice ){
    const err = new Error('Не всі дані введені!');
    err.status = 404;
    throw err;
  }
  const newService = await new Service(req.body);
  if(!newService){
    const err = new Error('Нового Service не додано!');
      err.status = 404;
      throw err;
  }
  const createdService = await newService.save();
  res.status(200).json(createdService);
}

exports.editService = async (req, res) => {
  const id = req.query.id;
  if(!id){
    const error = new Error('Не вказаний id');
    error.status(404);
    throw error;
  }
  const updateObj = req.body;

  const foundedService = await Service.findByIdAndUpdate(id, updateObj, {new: true});
  res.status(200).json(foundedService);
}

exports.deleteService = async (req, res) => {
  if(!req.query.id){
    const err = new Error('Не введений id!');
    err.status = 404;
    throw err;
  }
  const deletedService = await Service.findByIdAndDelete(req.query.id);
  res.status(200).json(deletedService);
}

