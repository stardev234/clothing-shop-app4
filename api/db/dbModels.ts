import mongoose, { Schema, model } from 'mongoose';


const productSchema = new Schema({
  barcode: String,
  name: String,
  category: String,
  brand: String,
  size: String,
  color: String,
  material: String,
  price: String,
  stock: String,
  description: String,
  date: Date,
  gender: String,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;