const express = require('express');
const { check } = require('express-validator');
const passport = require('passport');
require('../modules/passport');
const {addService,
       getServiceList,
       getSingleService,
       editService,
       deleteService} = require('../controllers/service');
const {catchErrors} = require('../errors/errorHandler');
const {uploadNone} = require('../helpers/multer');
const router = express.Router();
const {checkIfAuthenticated} = require('../helpers/authCheck');

router.route('/service')
  .get(  catchErrors(getServiceList));
router.route('/service/single')
  .get(   catchErrors(getSingleService) )
  .post(   catchErrors(addService) )
  .put(    catchErrors(editService) )
  .delete(  catchErrors(deleteService));


module.exports = router;
