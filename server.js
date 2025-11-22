// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Fixed statuses (your requirement)
const statuses = [
  "Parcel Booked",
  "In Transit",
  "Arrived at Hub",
  "Out for Delivery",
  "Delivered",
  "Failed / Returned"
];

// MAIN API ENDPOINT
app.get("/track/:id", (req, res) => {
  const id = req.params.id;

  // AWX + 7 digits validation
  if(!/^AWX\d{7}$/.test(id)){
    return res.json({ error: "Invalid Tracking ID format (Use AWX1234567)" });
  }

  // Random live-like status
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  res.json({
    tracking_id: id,
    status: randomStatus,
    last_updated: new Date().toISOString()
  });
});

// SERVER RUNNING
app.listen(3000, () => console.log("🟢 Tracking API running on port 3000"));
