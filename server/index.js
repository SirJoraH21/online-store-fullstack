require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const sequelize = require('./db');
const router = require('./routes/index');
const models = require('./models/models');
const errorHandler = require('./middlware/errorHandlingMidlware');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// Error handling, last middlware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server been started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
