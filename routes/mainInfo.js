const { check } = require('express-validator');
const express = require('express');
const {addInfo,
       getInfo,
       editInfo,
       deleteInfo} = require('../controllers/mainInfo');
const {catchErrors} = require('../errors/errorHandler');
const {upload, uploads} = require('../helpers/multer');
const {checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/info')
  .get( catchErrors(getInfo) )
  .post(  uploads,
         [check('name').not().isEmpty(),
          check('about').not().isEmpty(),
          check('address').not().isEmpty(),
          check('phones').not().isEmpty(),
          check('email').not().isEmpty()],
         catchErrors(addInfo) )
  .put(checkIfAuthenticated,  uploads,
        [check('id').isMongoId(),
         check('email').if(check('email').exists()).isEmail()],
        catchErrors(editInfo) )
  .delete(checkIfAuthenticated, [check('id').isMongoId()],
          catchErrors(deleteInfo));

module.exports = router;
