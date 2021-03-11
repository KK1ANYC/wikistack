const express = require('express');
const index = require('./views/index');
const morgan = require('morgan');
const path = require('path')

const app = express();

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static middleware
// app.use(express.static(path.join(__dirname, 'views')));

//GET
app.get('/', (req, res, next) => {
  res.send(index)
})


const PORT = 1337

// listen
app.listen(PORT, () => {
  console.log(`port ${PORT} is listening`)
})
