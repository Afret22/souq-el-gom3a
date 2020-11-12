const express = require("express");
const products = require("./data/products");
const dotenv = require('dotenv')

dotenv.config()

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.get("/api/products/", (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on ${PORT}`));
