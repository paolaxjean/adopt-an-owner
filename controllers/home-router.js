const router = require("express").Router();
const { User } = require("../models");

// use withAuth middleware to redirect from protected routes.
// const withAuth = require("../util/withAuth");

// example of a protected route
// router.get("/users-only", withAuth, (req, res) => {
//   // ...
// });

router.get("/", async (req, res) => {
  try {
    let user;
    if (req.session.isLoggedIn) {
      user = await User.findByPk(req.session.userId, {
        exclude: ["password"],
        raw: true,
      });
    }
    res.render("home", {
      title: "Home Page",
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Log-In Page" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign-Up Page" });
});

router.get("/users", async (req, res) => {
  try {
  const users = await User.findAll();
  const adopters = await users.map((u) => {
    u.get({plain: true});
  })
  console.log(users)
  res.json(users)
  res.render("owners", adopters);
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get("/users/:id", async (req, res) => {
  try {
    const profileData = await User.findByPk(req.params.id, {
      exclude: ['password']
    })
    const profile = await profileData.get({ plain: true })
    console.log(profile)
    res.json(profile)
    // res.render("bio", {profile}) 
    // ^ error: Cannot set headers after they are sent to the client
  } catch (error) {
    res.status(500).json(error);
  }
})



module.exports = router;
