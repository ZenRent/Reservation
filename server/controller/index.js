const model = require('../model');

const getRandomId = (range) => {
  const randomId = Math.ceil(Math.random() * range);
  return randomId;
};

module.exports.getData = (req, res) => {
  let id;
  if (req.params.id) {
    id = req.params.id;
  } else {
    id = getRandomId(100);
  }
  model.getData(id, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
