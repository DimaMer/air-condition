let { addClient, 
      getClientList,
      getSingleClient,
      editClient,
      deleteClient,
      login 
    } = require('../actions/client');
exports.addClient = async (req, res) =>{
  const error = await addClient(req, res);
  if(error){ throw error; } 
};
exports.getClientList = async (req, res) =>{
  const error = await getClientList(req, res);
  if(error){ throw error; } 
};
exports.getSingleClient = async (req, res) =>{
  const error = await getSingleClient(req, res);
  if(error){ throw error; } 
};
exports.editClient = async (req, res) =>{
  const error = await editClient(req, res);
  if(error){ throw error; } 
};
exports.deleteClient = async (req, res) =>{
  const error = await deleteClient(req, res);
  if(error){ throw error; } 
};
exports.login = async (req, res) =>{
  const error = await login(req, res);
  if(error){ throw error; } 
};
