const express = require("express");
const Room = require("../models/room.model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const room = await Room.create(req.body);
    return res.status(201).send(room);
  } catch (err) {
    return res.send(500).send(err.message);
  }
});

module.exports = router;
