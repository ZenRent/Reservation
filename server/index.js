const express = require('express');
const path = require('path');

const app = express();
const port = '3003';

app.use(express.static(path.join(__dirname, '../client/public')));

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
