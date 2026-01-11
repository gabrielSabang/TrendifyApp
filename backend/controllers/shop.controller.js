import Product from '../Models/products.js'

export const swipeNext = async (req, res) => {
  const userId = req.user
  if (!userId)
    return res.status(401).json({ message: "Unauthorized" })

  try {
    const prodId = req.params.id
    const product = await Product.findById(prodId)
    if (!product)
      return res.status(401).json({ message: "Product not found" })

    

  } catch (error) {
    console.log(error);

  }
}