const mongoose = require('mongoose');

const {Schema} = mongoose;

const host = 'localhost';
const port = '27017';
const database = 'zenrent';
const uri = `mongodb://${host}:${port}/${database}`;
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
    console.log(`Connected to MongoDB database ${connection._connectionString}`);
    connection.on('error', (err) => {
      console.error(err);
    });
    process.on('SIGINT', () => {
      const {pid} = process;
      connection.close();
      console.log('\nMongoDB connection closed');
      console.log(`About to exit Node process ID ${pid}`);
      process.exit();
    });
  }
});
