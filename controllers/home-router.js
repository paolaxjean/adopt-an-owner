const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../util/withAuth");
// use withAuth middleware to redirect from protected routes.


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

router.get("/owners",withAuth, async (req, res) => {
  try {
  const users = await User.findAll();
  const owners = await users.map((u) => {
   return u.get({plain: true});
  })
  res.render('owners', {owners});
  } catch (error) {
    res.status(500).json(error)
  } 
})

// for viewing a specific owner profile
router.get("/owners/:id", async (req, res) => {
  try {
    const profileData = await User.findByPk(req.params.id, {
      exclude: ['password']
    })
    const profile = await profileData.get({ plain: true })
    res.render('bio', {profile}) 
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;