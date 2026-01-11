import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors' 
import cookiesParser from 'cookie-parser'

import userRoute from './routers/user.router.js'
import productRoute from './routers/product.router.js'
import ordersRoute from './routers/order.router.js'
import { DB_connect } from './config/db.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], 
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookiesParser())

app.use('/Trendify/user', userRoute);
app.use('/Trendify/products', productRoute);
app.use('/Trendify/orders', ordersRoute)
app.use('/uploads', express.static('uploads'));

DB_connect()
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });

  }).catch((err) => {
    
    console.log("Error connecting to database", err);
  })
