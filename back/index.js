const express = require('express');
const CONST = require('./utils/consts');
const router = require('./utils/router');
const Users = require('./controllers/users');

const app = express();

app.use(express.json());
app.use(router);

app.get('/', (req, res, next) => {
  res.sendStatus(403);
});

const server = app.listen(CONST.PORT, init());

async function init() {
  var superResult = await Users.Super();
  
  console.log(superResult);

  if(!superResult.result){
    server.close();
  }
  
  console.log(`App running at port ${CONST.PORT}`)
}