const database = require('./index.js');
const { Listing } = require('./Listing.js');

Listing.collection.drop()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    setTimeout(process.exit, 500);
  });
