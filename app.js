// app.js
const express = require("express");
const app = express();
const todoRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");

app.use(express.json());
app.use("/api/post", todoRoutes);
app.use('/api/user', userRoutes)

module.exports = app