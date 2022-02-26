const express = require("express");
const Hotel = require("../models/hotel.model");
const Room = require("../models/room.model");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    return res.status(201).send(hotel);
  } catch (err) {
    return res.send(500).send(err.message);
  }
});

router.get("/:hotelname", async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ placeName: req.params.hotelname })
      .populate({ path: "address" })
      .populate({ path: "rooms" })
      .lean()
      .exec();
    return res.status(200).send(hotel);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:hotelName/rooms", async (req, res) => {
  try {
    const rooms = await Hotel.findOne({ placeName: req.params.hotelName })
      .populate({ path: "rooms" })
      .select({
        _id: 0,
        placeName: 0,
        placeDescription: 0,
        placeImg: 0,
        address: 0,
      })
      .lean()
      .exec();
    return res.send(rooms);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:hotelName/address", async (req, res) => {
  try {
    const address = await Hotel.findOne({
      placeName: req.params.hotelName,
    })
      .populate({ path: "address" })
      .select({
        _id: 0,
        placeName: 0,
        placeDescription: 0,
        placeImg: 0,
        rooms: 0,
      })
      .lean()
      .exec();
    return res.status(200).send(address);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
