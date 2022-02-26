const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    facilities: [{ type: String, required: false }],
    basicPrice: { type: Number, required: true },
    roomDescription: { type: String, required: true },
    roomImg: [{ type: String, required: true }],
    totalBeds: { type: Number, required: true },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
