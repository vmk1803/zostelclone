const express = require("express");
const Address = require("../models/address.model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const address = await Address.create(req.body);
    return res.status(201).send(address);
  } catch (err) {
    return res.send(500).send(err.message);
  }
});

module.exports = router;
