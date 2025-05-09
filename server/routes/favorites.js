import express from "express";
import Favorite from "../models/Favorite.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

router.post("/", async (req, res) => {
  try {
    const existing = await Favorite.findOne({ code: req.body.code });
    if (existing) {
      return res.status(409).json({ message: "Product already favorited" });
    }
    const favorite = new Favorite(req.body);
    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    res.status(400).json({ error: "Failed to add favorite" });
  }
});

router.delete("/:code", async (req, res) => {
  try {
    const result = await Favorite.findOneAndDelete({ code: req.params.code });
    if (!result) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.json({ message: "Favorite deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

export default router;
