const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const Page = db.define("page", {
  title: { type: Sequelize.STRING },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: {
    type: Sequelize.ENUM("open", "closed"),
    allowNull: false,
  },
});

// Page.beforeSave((userInstance, optionsObject) => {
//   userInstance.slug = userInstance.title.replace(/\s+/g, "_").replace(/\W/g, "");
// })

const User = db.define("user", {
  name: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = { db, Page, User };
