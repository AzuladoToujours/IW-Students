const mongoose = require('mongoose');
const options = require('../config/index');

const connect =
  ((url = options.configs.dbUrl),
  (opts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }),
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Successful connection with database');
    return mongoose.connect(url, {
      ...opts,
    });
  });

module.exports = { connect };
