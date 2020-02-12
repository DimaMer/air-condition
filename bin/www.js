const http    = require('http');
const app     = require('../app');
//require('dotenv').config({path: __dirname + '/variables.env'});
require('../dbconf/db');

var port = process.env.PORT || '3030';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, ()=>{
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  console.log(`We are listening the port ${process.env.PORT}`);
});
