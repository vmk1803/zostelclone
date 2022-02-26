const express = require("express");
const hotel_controller = require("./controllers/hotel.controller");
const address_controller = require("./controllers/address.controller");
const room_controller = require("./controllers/room.controller");
const razor_controller = require("./controllers/razor.controller");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/hotels", hotel_controller);
app.use("/addresses", address_controller);
app.use("/rooms", room_controller);
app.use("/razors", razor_controller);

module.exports = app;
