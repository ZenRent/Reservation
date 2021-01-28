const express = require('express');
const cors = require('cors');
const path = require('path');
const controller = require('./controller');

const app = express();
const port = '3002';

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../client/public')));
app.use('/:id', express.static(path.join(__dirname, '../client/public')));

app.get('/api/listings', controller.getData);
app.get('/api/listings/:id', controller.getData);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
