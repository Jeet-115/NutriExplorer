import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  product_name: String,
  brands: String,
  image_url: String,
  quantity: { type: Number, default: 1 },
  nutrition_grades_tags: [String]
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
