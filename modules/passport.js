const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Admin } = require('../models/Admin');

const bcrypt = require('bcryptjs');

passport.serializeUser((client, done)=>{

  return done(null,client.id);
});

passport.deserializeUser((id, done)=>{

  Admin.findById(id)
  .then( client =>{
    return done(null,client);
  });
});

passport.use(new LocalStrategy(

  { usernameField: 'email' },
  async function(email, password, done) {
    const foundedAdmin = await Admin.findOne({ email });
    if(!foundedAdmin){
      return done(null, false);
    }
    const success = await bcrypt.compare(password, foundedAdmin.password);
    if (!success){ return done(null, false) }
      return done(null, foundedAdmin);
  }
));
