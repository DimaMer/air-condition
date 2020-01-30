/*Функція passport-a яка перевіряє чи авторизований користувач в системі
(чи є його дані в кукіз сесії)
*/
exports.checkIfAuthenticated = (req, res, next) =>{
  if(req.headers.authorization) return next();
  if (req.isAuthenticated()) { return next(); }
  res.status(401).send('Not authorised');
}
