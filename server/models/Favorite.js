import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  product_name: String,
  brands: String,
  image_url: String,
  nutrition_grades_tags: [String],
}, { timestamps: true });

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
