import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config()
const secretKey = process.env.JWT_SECRET

export const ifLoggedIn = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return res.status(400).json({ message: "Not logged in" })
  
  try {
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded.id
    next()

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server error" })

  }
}
