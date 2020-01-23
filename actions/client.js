const { Client } = require('../models/Client');

exports.getClientList = async (req, res) =>{
  let ClientList = null;
  if(req.query.status == 'true'){
    ClientList =  await Client.find({active: true});
  }else if(req.query.status == 'false'){
    ClientList =  await Client.find({active: false});
  }else{
    ClientList =  await Client.find();
  }
  res.status(200).json(ClientList);
}

exports.getSingleClient = async (req, res) =>{
  if(!req.query.id){
    const err = new Error('Не введено id клієнта!');
    err.status = 404;
    throw err;
  }
  const FoundedClient = await Client.findById(req.query.id);
  res.status(200).json(FoundedClient);
}

exports.addClient = async (req, res)=>{
  if( !req.body.name || !req.body.phone ){
    const err = new Error('Не всі дані введені!');
    err.status = 404;
    throw err;
  }

  let foundedClient = await Client.findOneAndUpdate({phone:req.body.phone},
                                                    req.body, {new: true});
  if( foundedClient ){
    return res.status(200).json(foundedClient);
  }

  const newClient = await new Client(req.body);
  if(!newClient){
    const err = new Error('Нового клієнта не додано!');
      err.status = 404;
      throw err;
  }
  const createdClient = await newClient.save();
  res.status(200).json(createdClient);
}

exports.editClient = async (req, res) => {
  const id = req.query.id;
  if(!id){
    const error = new Error('Не вказаний id');
    error.status(404);
    throw error;
  }
  const updateObj = req.body;

  const foundedClient = await Client.findByIdAndUpdate(id, updateObj, {new: true});
  res.status(200).json(foundedClient);
}

exports.deleteClient = async (req, res) => {
  if(!req.query.id){
    const err = new Error('Не введений id!');
    err.status = 404;
    throw err;
  }
  const deletedClient = await Client.findByIdAndDelete(req.query.id);
  res.status(200).json(deletedClient);
}

exports.login = async (req, res) => {
  res.status(200).send('Successfully authenticated!');
}

