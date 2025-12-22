const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  review_id: String,
  user_id: String,
  order_id: String,
  rating: { type: Number, default: 0 },
  file_path: [String],
  message: String,
  date: String,
  fname: String
}, { _id: false });

const BenefitSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
  description: String,
  created_at: String,
  updated_at: String
}, { _id: false });

const HowToUseSchema = new mongoose.Schema({
  id: String,
  title: String,
  step_number: String,
  description: String,
  image: String,
  created_at: String,
  updated_at: String
}, { _id: false });

const FAQSchema = new mongoose.Schema({
  id: String,
  question: String,
  answer: String,
  created_at: String,
  updated_at: String
}, { _id: false });

const PackSchema = new mongoose.Schema({
  id: String,
  pack_name: String,
  base_price: String,
  price: String,
  sku_id: String,
  disscount: String,
  quantity: String,
  description: String,
  image: String,
  show_status: String,
  created_at: String,
  updated_at: String
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  product_id: { type: String, unique: true },
  product_name: String,
  tittle: String,
  discription: String,
  slug: String,
  price: String,
  quantity: String,
  image: [String],
  product_status: String,
  gst_price: String,
  created_at: String,
  updated_at: String,
  reviews: [ReviewSchema],
  benefits: [BenefitSchema],
  how_to_use: [HowToUseSchema],
  f_and_q: [FAQSchema],
  packs_data: [PackSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
