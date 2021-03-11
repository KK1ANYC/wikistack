/* eslint-disable spaced-comment */
/* eslint-disable no-trailing-spaces */
const express = require("express");
const index = require("./views");
const morgan = require("morgan");
const path = require("path");
const { db, Page, User } = require("./models");
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');
// ...

//node automatically goes to index.js in files

const app = express();

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

// static middleware
// app.use(express.static(path.join(__dirname, 'views')));

//GET / 
app.get("/", (req, res, next) => {
  res.redirect('/wiki');
});

const PORT = 3000;

// listen

const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
