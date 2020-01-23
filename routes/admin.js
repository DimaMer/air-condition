const express  = require('express');
const passport = require('passport');
const { check } = require('express-validator');
require('../modules/passport');

const {addAdmin,
       getAdminList,
       getSingleAdmin,
       editAdmin,
       deleteAdmin,
       resetAdminData,
       resetConfirm,
       login,
       logout
       } = require('../controllers/admin');
const {catchErrors} = require('../errors/errorHandler');
const {uploadNone} = require('../helpers/multer');
const {checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/admin')
  .get(checkIfAuthenticated,   catchErrors( getAdminList ));
router.route('/admin/single')
  .get(checkIfAuthenticated,  [check('id').isMongoId()],
        catchErrors(getSingleAdmin) )
  .post(checkIfAuthenticated,   uploadNone,
         [check('firstName').not().isEmpty(),
          check('lastName').not().isEmpty(),
          check('email').isEmail(),
          check('password').isLength({ min: 4 })],
         catchErrors(addAdmin) )
  .put(checkIfAuthenticated,  uploadNone,
        [check('id').isMongoId(),
         check('email').if(check('email').exists()).isEmail(),
         check('password').if(check('password').exists()).isLength({ min: 4 })],
         catchErrors(editAdmin) )
  .delete(checkIfAuthenticated,  [check('id').isMongoId()],
           catchErrors(deleteAdmin));
router.route('/admin/login')
  .post( uploadNone, passport.authenticate('local', {
      failureRedirect: ''
  }), catchErrors(login));
router.route('/admin/logout')
  .get( catchErrors(logout) );
// router.route('/admin/reset')
//   .get( [check('email').isEmail()],
//         catchErrors(resetAdminData) );
// router.route('/admin/resetpassword')
//   .get( catchErrors(resetConfirm), passport.authenticate('local'),
//         function(req, res) { res.status(200).send('Successfuly authenticated!') });

module.exports = router;
