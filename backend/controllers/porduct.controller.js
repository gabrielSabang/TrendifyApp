import Product from '../Models/products.js';
import User from '../Models/user.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export { upload };

export const getProducts = async (req, res) => {
  const userId = req.user
  if (!userId)
    return res.status(401).json({ message: "Unauthorized" })

  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product found", product });

  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const limitNum = parseInt(limit);
    const skipNum = parseInt(skip);

    const products = await Product.find({ productStatus: true })
      .populate('owner')
      .limit(limitNum)
      .skip(skipNum);

    const total = await Product.countDocuments({ productStatus: true });

    res.status(200).json({ products, total });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export const postProduct = async (req, res) => {
  const userId = req.user
  if (!userId)
    return res.status(401).json({ message: "Unauthorized" })
  try {
    const { name, description, price } = req.body;
    const productPic = req.file ? req.file.path : null;

    if (!name || !description || !price || !productPic)
      return res.status(400).json({ message: "All fields are required" });

    const newProduct = await Product.create({ owner: userId, name, description, price, productPic });
    res.status(201).json({ message: "Product created successfully", newProduct });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

export const editProduct = async (req, res) => {
  const userId = req.user
  if (!userId)
    return res.status(401).json({ message: "Unauthorized" })

  try {
    const { id } = req.params;
    const { name, description, price, productPic } = req.body;

    if (!name, !description, !price, !productPic)
      return res.status(401).json({ message: "All input field required" })

    const updatedProduct = await Product.findByIdAndUpdate(id, { owner: userId, name, description, price, productPic }, { new: true });

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

export const deleteProduct = async (req, res) => {

  const userId = req.user
  if (!userId)
    return res.status(401).json({ message: "Unauthorized" })

  try {
    const { id } = req.params;
    const deletedItem = await Product.findByIdAndDelete({ id, owner: userId });
    if (!deletedItem)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}