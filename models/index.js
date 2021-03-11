const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const Page = db.define("page", {
  title: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
  slug: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
  content: { type: Sequelize.TEXT, allowNull: false, defaultValue: "" },
  status: {
    type: Sequelize.ENUM("open", "closed"),
    allowNull: false,
    defaultValue: "closed",
  },
});

const User = db.define("user", {
  name: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    defaultValue: "",
  },
});

module.exports = { db, Page, User };
