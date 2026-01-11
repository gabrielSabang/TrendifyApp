import express from 'express'
import { ifLoggedIn } from '../middleware/authMiddleware.js'
import {
  getAllProducts,
  getProducts,
  postProduct,
  editProduct,
  deleteProduct,
  upload
} from '../controllers/porduct.controller.js'

const router = express.Router()

router.get('/:id', ifLoggedIn, getProducts)
router.get('/', getAllProducts)
router.post('/', ifLoggedIn, upload.single('productPic'), postProduct)
router.put('/:id', ifLoggedIn, editProduct)
router.delete('/:id', ifLoggedIn, deleteProduct)

export default router
