let { addService,
      getServiceList,
      getSingleService,
      editService,
      deleteService,
      login
    } = require('../actions/service');
exports.addService = async (req, res) =>{
  const error = await addService(req, res);
  if(error){ throw error; }
};
exports.getServiceList = async (req, res) =>{
  const error = await getServiceList(req, res);
  if(error){ throw error; }
};
exports.getSingleService = async (req, res) =>{
  const error = await getSingleService(req, res);
  if(error){ throw error; }
};
exports.editService = async (req, res) =>{
  const error = await editService(req, res);
  if(error){ throw error; }
};
exports.deleteService = async (req, res) =>{
  const error = await deleteService(req, res);
  if(error){ throw error; }
};
exports.login = async (req, res) =>{
  const error = await login(req, res);
  if(error){ throw error; }
};
