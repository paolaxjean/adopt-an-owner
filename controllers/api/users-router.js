const { User } = require("../../models");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create(req.body, { username, password});
    req.session.isLoggedIn = true;
    req.session.userId = user.id;
    req.session.save(() => res.json({ id: user.id }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});


router.post("/signup", async (req, res) => {
 
  try {
    const user = await User.create(req.body, { name:req.body.name, password:req.body.password, desired_pet:req.body.desired_pet, family_size:req.body.family_size, income:req.body.income, email:req.body.email, age:req.body.age, bio:req.body.bio });
    req.session.isLoggedIn = true;
    req.session.userId = user.id;
    req.session.save(() => res.json({ id: user.id }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found.");
    }
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    req.session.isLoggedIn = true;
    req.session.userId = user.id;
    req.session.save(() => res.json({ id: user.id }));
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid username or password." });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.end();
  });
});



module.exports = router;
