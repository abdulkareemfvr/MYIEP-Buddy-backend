const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const core = require("cors");

// db connection
const dbConnect = require("./utils/db/db");

// routers
const user = require("./routers/v1/user/user.router");
// payment
const payment = require("./routers/v1/payment/payment.router");
// ai
const ai = require("./routers/v1/ai/ai.router");

dbConnect();

// middleware
app.use(express.json());
app.use(core());

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// routes

// user
app.use("/api/v1/user", user);

// payment
app.use("/api/v1/payment", payment);

// ai
app.use("/api/v1/ai", ai);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
