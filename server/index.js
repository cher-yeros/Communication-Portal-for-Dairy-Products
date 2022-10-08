const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middlewares

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//routes
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const buyer = require("./routes/buyer");
const seller = require("./routes/seller");
const post = require("./routes/post");

//initiate routes
app.use("/api", auth);
app.use("/api/admin", admin);
app.use("/api/buyer", buyer);
app.use("/api/seller", seller);
app.use("/api/post", post);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening to Localhost on port 5000`);
});
