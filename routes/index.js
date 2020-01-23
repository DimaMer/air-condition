const express    = require('express');

const movieQuote = require("popular-movie-quotes");
const admin      = require('./admin');
//const employee   = require('./employee');
const client     = require('./client');
//const feedback   = require('./feedback');
//const gallery    = require('./gallery');
//const news       = require('./news');
//const service    = require('./service');
//const subservice = require('./subservice');
const mainInfo   = require('./mainInfo');
//const vacancy    = require('./vacancy');
//const call       = require('./call');
//const candidate       = require('./candidate');
const app = express();
app.use('/api', admin);
//app.use('/api', employee);
app.use('/api', client);
//app.use('/api', feedback);
//app.use('/api', gallery);
//app.use('/api', news);
//app.use('/api', service);
//app.use('/api', subservice);
app.use('/api', mainInfo);
//app.use('/api', vacancy);
//app.use('/api', call);
//app.use('/api', candidate);

app.use('*', (req, res) =>{
    res.send(movieQuote.getRandomQuote())
});

module.exports = app;
