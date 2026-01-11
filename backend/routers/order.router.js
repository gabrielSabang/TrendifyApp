import express from 'express'
import { getAllOrders, addToCart, deleteOrder } from '../controllers/order.controller.js';
import { ifLoggedIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/cart', ifLoggedIn, getAllOrders)
router.post('/cart/:id', ifLoggedIn, addToCart)
router.post('/cart/delete/:id', ifLoggedIn, deleteOrder)

export default router