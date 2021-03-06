const multer = require('multer');
const cloudinary  = require('cloudinary')
cloudinary.config({
  cloud_name: 'dtmqswql7',
  api_key: '441733751616911',
  api_secret: 'NrPljZnLRI5HxIRTytVOwiBaQy0',
});

/* Реалізація мультера (для завантаження картинок у сховище)
  upload - для завантаження фоографій
  uploadCv - для завантаження резюме
  uploadNone - просто читання даних з form-data взагалі без файла
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname==='photoHead') return cb(null, './public/photo');
    return cb(null, `public/${file.fieldname}`);
  },
  filename: (req, file, cb) => {
     cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

exports.upload =  multer({ storage }).fields([
    { name: 'photo', maxCount: 1 }
  ]);

exports.uploadCv = multer({ storage }).fields([
  { name: 'resume', maxCount: 1 }
]);

exports.uploadNone = multer().none();

exports.cloud = (req, res, next) => {
  let path =  (req.files&&req.files.photo)? req.files.photo[0].path: null;
  cloudinary.uploader.upload(path, function(image, err ) {
    if (err)return res.send(err);
    if (image.url) {req.files.photo=image.url}
    return next();
  })}

exports.uploads =  multer({ storage }).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'photoHead', maxCount: 1 }
]);
