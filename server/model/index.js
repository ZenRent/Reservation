const { Listing } = require('../../database/Listing.js');

module.exports.getData = (id, callback) => {
  Listing.find({ listingId: id }, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};
