const mongoose = require('mongoose');

const port = '27017';
const uri = `mongodb://${process.env.MONGO_HOST}:${port}/${process.env.MONGO_DATABASE}`;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

let connection;
mongoose.connect(uri, options, (err) => {
  if (err) {
    console.error(err);
  } else {
    connection = mongoose.connection;
    const { _connectionString } = connection;
    console.log(`Connected to MongoDB database ${_connectionString}`);
    connection.on('error', (err) => {
      console.error(err);
    });
    process.on('SIGINT', () => {
      const { pid } = process;
      connection.close();
      console.log('\nMongoDB connection closed');
      console.log(`About to exit Node process ID ${pid}`);
      process.exit();
    });
  }
});
