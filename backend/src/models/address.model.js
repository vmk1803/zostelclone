const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    contact: { type: Number, required: true },
    directionDescription: { type: String, required: true },
    directionDetails: { type: Object, required: true },
    mapUrl: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Address = mongoose.model("address", addressSchema);

module.exports = Address;
