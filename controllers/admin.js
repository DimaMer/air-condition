let { addAdmin, 
      getAdminList,
      getSingleAdmin,
      editAdmin,
      deleteAdmin,
      login,
      logout,
      resetAdminData,
      resetConfirm 
    } = require('../actions/admin');
exports.addAdmin = async (req, res) =>{
  const error = await addAdmin(req, res);
  if(error){ throw error; } 
};
exports.getAdminList = async (req, res) =>{
  const error = await getAdminList(req, res);
  if(error){ throw error; } 
};
exports.getSingleAdmin = async (req, res) =>{
  const error = await getSingleAdmin(req, res);
  if(error){ throw error; } 
};
exports.editAdmin = async (req, res) =>{
  const error = await editAdmin(req, res);
  if(error){ throw error; } 
};
exports.deleteAdmin = async (req, res) =>{
  const error = await deleteAdmin(req, res);
  if(error){ throw error; } 
};
exports.login = async (req, res) =>{
  const error = await login(req, res);
  if(error){ throw error; } 
};
exports.logout = async (req, res) =>{
  const error = await logout(req, res);
  if(error){ throw error; } 
};
exports.resetAdminData = async (req, res) =>{
  const error = await resetAdminData(req, res);
  if(error){ throw error; } 
};
exports.resetConfirm = async (req, res) =>{
  const error = await resetConfirm(req, res);
  if(error){ throw error; } 
};