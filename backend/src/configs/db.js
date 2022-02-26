const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://vmk1803:Vmuralik1@cluster0.7racz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
};

module.exports = connect;
