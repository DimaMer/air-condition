const nodemailer  = require('nodemailer');
const jwt         = require('jsonwebtoken');
const {Admin}     = require('../models/Admin');
const {updateEntity} = require('../helpers/entityUpdater');
const {validateData} = require('../helpers/dataValidator');
exports.getAdminList = async (req, res) =>{
  let adminList = await Admin.find();
  if(!adminList){
    const err = new Error('Виникла помилка при виконанні запиту!');
    err.status = 500;
    throw err;
  }
  res.status(200).json(adminList);
}

exports.getSingleAdmin = async (req, res) =>{
  await validateData(req);
  const foundedAdmin = await Admin.findById(req.query.id);
  if(!foundedAdmin){
    const error = new Error('Адміна з таким id не існує!');
    error.status = 404;
    throw error;
  }
  res.status(200).json(foundedAdmin);
}

exports.addAdmin = async (req, res)=>{
  await validateData(req);
  const newAdminData = req.body;
  console.log(newAdminData);
  const newAdmin = new Admin(newAdminData);
  const createdAdmin = await newAdmin.save();
  res.status(200).json(createdAdmin);
}

exports.editAdmin = async (req, res) => {
  await validateData(req);
  const{id} = req.query;
  const foundedAdmin = await updateEntity(id, req, Admin);
  if(!foundedAdmin){
    const error = new Error('Помилка при виконанні оновлення!');
    error.status = 500;
    throw error;
  }
  res.status(200).send('Успіх!');
}

exports.deleteAdmin = async (req, res) => {
  await validateData(req);
  const deletedAdmin = await Admin.findByIdAndDelete(req.query.id);
  res.status(200).json(deletedAdmin);
}

exports.login = async (req, res) => {
  res.status(200).send('Successfully authenticated!');
}

exports.logout = (req, res) => {
  req.logout();
  res.clearCookie("connect");
  res.status(200).send('До побачення )');
};

exports.resetAdminData = async(req, res) => {
  //Отримуємо дані про адміна по ел. пошті
  await validateData(req);
  const email = req.query.email;
  const admin = await Admin.findOne({email}, {password:1});
  if(!admin){
    const error = new Error('Адміна з такою адресою не існує!');
    error.status = 404;
    throw error;
  }

  //Формуємо дані для передачі в поштову скриньку адміна
  const token = await jwt.sign({admin}, process.env.SECRET,{ expiresIn: '600s' });

  let HelperOptions = {
    from: '"Dent-art-studio" <dentartstudio@gmail.com>',
    to: email,
    subject: 'Відновлення паролю',
    html: `<h1>Для відновлення паролю перейдіть за посиланням:</h1><br><h2>`+
    `<a href="https://${req.headers.host}/api/admin/resetpassword/?token=${token}">Відновити пароль</a></h2>`,
    disableUrlAccess: true
  };

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    },
  });

  // verify connection configuration
  transporter.verify(function(err, success) {
    if (err) {
      const error = new Error('Проблеми з підключенням до поштової служби');
      error.status = 500;
      throw error;
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      throw error;
    }
    res.send({
      message:"Повідомлення успішно відправлене",
    });
  });
}

exports.resetConfirm = async (req, res) =>{
  const { token } = req.query;

  jwt.verify(token, process.env.SECRET, (err, data) => {
    if(err) {
        res.sendStatus(403);
    } else {
      res.json({
        id: data.admin._id,
        password: data.admin.password
      })
    }
  });
}
