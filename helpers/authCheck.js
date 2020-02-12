/*Функція passport-a яка перевіряє чи авторизований користувач в системі
(чи є його дані в кукіз сесії)
*/
exports.checkIfAuthenticated = (req, res, next) =>{
  console.log(111111111,req.headers.authorization);
  // return next()
  if(req.headers.authorization) return next();
  if (req.isAuthenticated()) { return next(); }
  res.status(401).send('Not authorised');
}
