import Order from "../Models/order.js"
import Product from "../Models/products.js"

export const getAllOrders = async (req, res) => {

  const userId = req.user
  if (!userId)
    return res.status(400).json({ message: "User not Found" })

  try {
    const cartItems = await Order.find({ user: userId }).populate('user').populate('item');
    console.log(cartItems)
    if (!cartItems)
      return res.status(400).json({ message: "Cart user is empty " })

    return res.status(200).json({ message: "successfully got all items", cartItems })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "server error" });
  }
}

export const addToCart = async (req, res) => {
  try {
    const userId = req.user;
    const itemId = req.params.id;

    if (!userId || !itemId)
      return res.status(400).json({ message: "User and Item are required to add to cart" });
  
    const product = await Product.findById(itemId)
    
    if (!product)
      return res.status(404).json({message: "Product not found"})

    if (!product.productStatus)
      return res.status(400).json({message: "Product not available"})

    // Check if already in cart
    const existingOrder = await Order.findOne({ user: userId, item: itemId });
    if (existingOrder) {
      return res.status(400).json({ message: "Product already in cart" });
    }

    const newOrder = await Order.create({ user: userId, item: itemId });

    // Mark product as unavailable
    await Product.findByIdAndUpdate(itemId, { productStatus: false });

    return res.status(201).json({ message: "Added to cart successfully", newOrder });
  } catch (error) {

    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const userId = req.user;
    const orderId = req.params.id;
    
    if (!userId ||!orderId)
      return res.status(400).json({ message: "Order ID not found" });

    const order = await Order.findOne({ user: userId, _id: orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    await Order.findByIdAndDelete(orderId);

    // Make product available again
    await Product.findByIdAndUpdate(order.item, { productStatus: true });

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}
