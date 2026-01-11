import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  owner:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, "Owner is not logged in"]
  },
  
  name: {
    type: String,
    required: true,
  },

  productPic: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },
  
  productStatus: {
    type: Boolean,
    
    default: true
  }

}, { timestamps: true })

const Product = mongoose.model("Product", ProductSchema);

export  default Product;