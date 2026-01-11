import mongoose from 'mongoose';

const Orderdetails = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

}, { timestamps: true });


const Order = mongoose.model("Order", Orderdetails);
export default Order