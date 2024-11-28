const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const router = express.Router();

const filePath = path.join(__dirname, "../data/orders.json");

router.get("/products", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Veri okunamadı", error: err });
    }

    const orders = JSON.parse(data);

    const products = orders.orders.flatMap((order) =>
      JSON.parse(order.products)
    );

    res.status(200).json(products);
  });
});

router.get("/products/:id", (req, res) => {
  const productId = req.params.id;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Veri okunamadı", error: err });
    }

    const orders = JSON.parse(data);
    const products = orders.orders.flatMap((order) => JSON.parse(order.products));

    const product = products.find((p) => p.id === parseInt(productId));

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Ürün bulunamadı" });
    }
  });
});



module.exports = router;
