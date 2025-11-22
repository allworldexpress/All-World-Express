const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Fixed statuses
const statuses = [
  "Parcel Booked",
  "In Transit",
  "Arrived at Hub",
  "Out for Delivery",
  "Delivered",
  "Failed / Returned"
];

// TEMP storage (database ki jagah)
let bookings = [];

// 🔵 CREATE BOOKING API
app.post("/book", (req, res) => {
  const data = req.body;

  if(!data.senderName || !data.receiverName){
    return res.json({ success: false, message: "All fields required!" });
  }

  // Auto Tracking ID
  const trackingId = "AWX" + Math.floor(1000000 + Math.random()*9000000);

  // Save locally
  bookings.push({
    trackingId,
    ...data,
    status: "Parcel Booked",
    createdAt: new Date()
  });

  res.json({ success: true, trackingId });
});

// 🔵 TRACKING API
app.get("/track/:id", (req, res) => {
  const id = req.params.id;
  const found = bookings.find(b => b.trackingId === id);

  if(!found){
    return res.json({ error: "Tracking ID not found!" });
  }

  res.json({
    tracking_id: id,
    status: found.status,
    last_updated: new Date().toISOString()
  });
});

// HOME PAGE CHECK
app.get("/", (req, res) => {
  res.send("AWX Tracking API is running...");
});

// START SERVER
app.listen(3000, () => console.log("🟢 Server Running on Port 3000"));
