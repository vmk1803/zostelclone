const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    placeName: { type: String, required: true },
    placeDescription: { type: String, required: true },
    placeImg: [{ type: String, required: true }],
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room",
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);

const Hotel = mongoose.model("hotel", hotelSchema);

module.exports = Hotel;
