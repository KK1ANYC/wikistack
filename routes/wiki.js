/* eslint-disable func-names */
const router = require('express').Router();
const { Page } = require("../models");
const { addPage } = require('../views');

router.get('/', (req,res,next) => {
  res.send('You are in the wiki page home');
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body.title);
    const something = function (title) {
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    };
    const page = await Page.create({
      title: body.title,
      content: body.content,
      slug: something(body.title),
      status: body.status,
    });

    await page.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
