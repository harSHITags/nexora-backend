const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// Add subscriber (Landing Page)
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Already subscribed" });
    }

    const subscriber = await Subscriber.create({ email });
    res.status(201).json(subscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all subscribers (Admin Panel)
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
