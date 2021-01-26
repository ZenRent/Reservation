const express = require('express');
const path = require('path');
const controller = require('./controller');

const app = express();
const port = '3003';

app.use('/:id', express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => {
  res.redirect('/1');
});

app.get('/api/listings/:id', controller.getData);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
