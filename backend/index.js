const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const ordersApi = require("./ordersServices");
const produsctsApi = require("./productServices");
app.use(cors(corsOptions));
app.use("/apiServices", ordersApi);
app.use("/apiServices", produsctsApi);

app.get("/", (req, res) => {
  res.send("Ana API Sunucusu");
});

 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
