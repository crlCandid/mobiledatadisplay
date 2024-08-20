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

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific methods
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
//   next();
// });

// app.get('/events', (req, res) => {
//   console.log('entered');
//   // Set headers to keep the connection open and specify the content type
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   res.flushHeaders(); // Send headers immediately

//   // Example: Send a message to the client every 5 seconds
//   const intervalId = setInterval(() => {
//     console.log('send');
//     res.write(`data: ${JSON.stringify({ message: 'Hello from the server!' })}\n\n`);
//   }, 5000);

//   // Handle client disconnection
//   req.on('close', () => {
//     clearInterval(intervalId);
//     res.end();
//   });
// });

const server = app.listen(CONST.PORT, init());

async function init() {
  var superResult = await Users.Super();
  
  console.log(superResult);

  if(!superResult.result){
    server.close();
  }
  
  console.log(`App running at port ${CONST.PORT}`)
}