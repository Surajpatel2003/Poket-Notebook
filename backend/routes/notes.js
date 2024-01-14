const express = require("express");
const { Schema } = require("mongoose");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([]);
});
module.exports = router;
