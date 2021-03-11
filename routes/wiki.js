/* eslint-disable func-names */
const router = require("express").Router();
const { Page } = require("../models");
const { addPage, wikiPage, main } = require("../views");

router.get("/", async (req, res, next) => {
  try {
    const page = await Page.findAll()
    console.log(page.rows[0])
    res.send(main(page));
  } catch (err) {
    next(err);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    res.send(wikiPage(page, ""));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const something = function (title) {
      return title.replace(/\s+/g, "_").replace(/\W/g, "");
    };
    const page = await Page.create({
      title: body.title,
      content: body.content,
      status: body.status,
      slug: something(body.title),
    });

    await page.save();

    res.redirect(`/wiki/${something(body.title)}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
