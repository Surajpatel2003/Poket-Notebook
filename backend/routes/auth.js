const express = require("express");
const { Schema } = require("mongoose");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "iamsuraj2003";

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

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
      // .then((user) => res.json(user))
      // .catch((error) => {
      //   res.send({
      //     message: "Pls enter unique email ",
      //     error: error.message,
      //   });
      // });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error is occure");
    }
  }
);
module.exports = router;
