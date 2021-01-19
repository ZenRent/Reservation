const model = require('../model');

module.exports.getData = (req, res) => {
  const { id } = req.params;
  model.getData(id, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
