const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/poketnotebook?directConnection=true";

const connectToMongo = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => console.log("mongo connect succesfully"))
    .catch((e) => console.log(e.message));
};

module.exports = connectToMongo;
