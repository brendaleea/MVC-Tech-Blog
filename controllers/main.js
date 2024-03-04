const router = require("express").Router();

const { Post, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.render("home", {
      posts,
      loggedIn: req.session.logged_in,
      home: true,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.get("/login", (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }

    res.render("login", {
      loggedIn: req.session.logged_in,
      login: true,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/login");
      return;
    }

    user = await User.findByPk(req.session.userid, {
      attributes: {
        exclude: ["password", "id"],
      },
      include: [Post],
    });
    res.render("dashboard", {
      data: user.dataValues,
      loggedIn: req.session.logged_in,
      dashboard: true,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

module.exports = router;
