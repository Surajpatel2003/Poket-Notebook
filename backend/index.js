const connectToMongo = require("./db");
const express = require("express");
const cors=require("cors");

// making connection between server and database
connectToMongo();

const app = express();
const port = 8000;
//middle ware for using  to access request body
app.use(express.json());

app.use(cors())
// Available Routes
app.use("/api/auth", require("./routes/auth")); //app.use() = it is use for linking the routes
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port}   http://localhost:${port}/`
  );
});
