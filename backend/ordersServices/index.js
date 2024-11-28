const express = require("express");
const fs = require("fs");
const router = express.Router();
const axios = require("axios");
const path = require("path");
const filePath = path.join(__dirname, "../data/orders.json");

router.get("/orders", (req, res) => {
  const doviz = req.query.doviz;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Veri okunamadı", error: err });
    }
    try {
      const orders = JSON.parse(data);
      const modifiedOrders = orders.orders.map((order, toplam) => {
        const urunler = JSON.parse(order.products); // order.products string formatında ise
        const urunStockProd = urunler[0].stocklogs[0];
        console.log(urunler[0].id);
        const musteriBilgileri = JSON.parse(order.customer);

        order.urunInfo = {
          id: urunler[0].id,
          ozellikler: urunler[0].attributes,
          urunAdi: urunler[0].product_name,
        };
        order.urunAdi = urunler[0].product_name;
        const toplamMaliyet =
          urunStockProd.stock_quantity *
          (urunStockProd.stock_cost +
            urunStockProd.credit_cost +
            urunStockProd.shipment_cost);

        if (req.query.doviz === "usd") {
          order.toplam_tutar = order.primary_rate * order.subtotal;
          order.karlilik_hesabi =
            order.primary_rate * order.subtotal -
            toplamMaliyet * order.primary_rate;

          order.toplam_maliyet = toplamMaliyet * order.primary_rate;
        }

        if (req.query.doviz === "tl") {
          order.toplam_tutar = order.secondary_rate * order.subtotal;
          order.karlilik_hesabi =
            order.secondary_rate * order.subtotal -
            toplamMaliyet * order.secondary_rate;
          order.toplam_maliyet =
            urunStockProd.stock_quantity *
            order.secondary_rate *
            (urunStockProd.stock_cost +
              urunStockProd.credit_cost +
              urunStockProd.shipment_cost);
        }
        order.doviz = doviz;
        order.toplam_miktar = urunStockProd.stock_quantity;

        return {
          sirket_Ad: musteriBilgileri.companyname,
          fatura_numarasi: order.invoice_number,
          musteri_bilgileri: musteriBilgileri,
          toplam_tutar: order.toplam_tutar,
          karlilik_hesabi: order.karlilik_hesabi,
          toplam_maliyet: order.toplam_maliyet,
          toplam_miktar: order.toplam_miktar,
          urunInfo: order.urunInfo,
          urunAdi: order.urunAdi,
          doviz: doviz,
        };
      });
      res.json(modifiedOrders);
    } catch (parseError) {
      return res
        .status(500)
        .json({ message: "JSON parse hatası", error: parseError });
    }
  });
});
router.get("/safe", async (req, res) => {
  try {
    const mysafe = 100000;
    const doviz = "usd";
    const ordersResponse = await axios.get(
      `http://localhost:3000/apiServices/orders?doviz=${doviz}`
    );

    const orders = ordersResponse.data;
    if (!Array.isArray(orders)) {
      return res.status(500).json({ error: "Geçersiz veri formatı" });
    }
    console.log(orders);
    const toplamKarlilik = orders.reduce(
      (acc, order) => acc + (order.karlilik_hesabi || 0),
      0
    );

    res.json({
      doviz: "usd",
      mevcut: mysafe,
      toplamKarlilik: toplamKarlilik + mysafe,
    });
  } catch (error) {
    console.error("Hata oluştu:", error.message);
    res.status(500).json({ error: "Karlılık hesaplanamadı." });
  }
});

router.get("/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Veri okunamadı", error: err });
    }
    const orders = JSON.parse(data).orders;
    const order = orders.find((o) => o.order_id === orderId);
    if (!order) {
      return res.status(404).json({ message: "Sipariş bulunamadı" });
    }
    res.json(order);
  });
});

module.exports = router;
