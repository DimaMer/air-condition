const express = require('express');
const { check } = require('express-validator');
const passport = require('passport');
require('../modules/passport');
const {addClient,
       getClientList,
       getSingleClient,
       editClient,
       deleteClient,
       login} = require('../controllers/client');
const {catchErrors} = require('../errors/errorHandler');
const {uploadNone} = require('../helpers/multer');
const router = express.Router();
const {checkIfAuthenticated} = require('../helpers/authCheck');

router.route('/client')
  .get(checkIfAuthenticated,  catchErrors(getClientList));
router.route('/client/single')
  .get(checkIfAuthenticated,   catchErrors(getSingleClient) )
  .post(checkIfAuthenticated,   catchErrors(addClient) )
  .put(checkIfAuthenticated,   uploadNone, catchErrors(editClient) )
  .delete(checkIfAuthenticated,  catchErrors(deleteClient));
router.route('/client/login')
  .post(checkIfAuthenticated,   uploadNone, passport.authenticate('local', { failureRedirect: 'https://dent-art-studio.herokuapp.com/api/client' }), catchErrors(login));
router.route('/client/facebookLogin')
  .get(checkIfAuthenticated,   passport.authenticate('facebook', {scope: ['email']}));
router.route('/client/facebookLogin/callback')
  .get(checkIfAuthenticated,   passport.authenticate('facebook', { failureRedirect: '/client' }), catchErrors(login));

module.exports = router;
