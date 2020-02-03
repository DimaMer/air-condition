const express = require('express');
const { check } = require('express-validator');
const {addItem,
       getItemList,
       getSingleItem,
       editItem,
       deleteItem} = require('../controllers/item');
const {catchErrors} = require('../errors/errorHandler');
const {uploadNone, upload, cloud} = require('../helpers/multer');
const router = express.Router();
const {checkIfAuthenticated} = require('../helpers/authCheck');

router.route('/item')
  .get(checkIfAuthenticated,  catchErrors(getItemList));
router.route('/item/single')
  .get(checkIfAuthenticated,   catchErrors(getSingleItem) )
  .post(checkIfAuthenticated, upload,  cloud,  catchErrors(addItem) )
  .put(checkIfAuthenticated,   uploadNone, catchErrors(editItem) )
  .delete(checkIfAuthenticated,  catchErrors(deleteItem));

module.exports = router;
