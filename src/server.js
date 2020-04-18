const express = require('express');
const { json, urlencoded, bodyParser } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const { connect } = require('./utils/dbConnection');
const { configs } = require('./config/index');

const app = express();
dotenv.config();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`REST API RUNNING at ${configs.apiUrl}`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = { start };
