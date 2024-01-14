const express = require("express");
const { Schema } = require("mongoose");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Create user using:POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("email", "Enter valid email").isEmail(),
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("password", "Enter valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);

    // If there are error return BAD request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({
          erorr: "Sorry a user with this email adress is already exist",
        });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // .then((user) => res.json(user))
      // .catch((error) => {
      //   res.send({
      //     message: "Pls enter unique email ",
      //     error: error.message,
      //   });
      // });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error is occure");
    }
  }
);
module.exports = router;
