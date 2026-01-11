import userModel from '../Models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const handleErrors = (err) => {
  let errors = { name: '', email: '', password: '' };

  if (err.code === 11000) {
    errors.email = 'That email is already registered';
    return errors;
  }
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
  return { message: err.message || 'Unknown error occurred' };
} 

const maxAge = 3 * 24 * 60 * 60;

const jasonwebtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  })
}

export const signUp = async (req, res) => {
  const { name, email, password, profilePicture } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const newUser = await userModel.create({ name, email, password, profilePicture });
    const token = jasonwebtoken(newUser._id);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ message: "User created successfully", newUser: newUser._id });

  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.login(email, password);
  
  if (!user)
    return res.status(400).json({ message: "Login Failed User not Found" });
  
  try {
    const token = jasonwebtoken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email, _id: user._id } })
  } catch (error) {
    handleErrors(error);
    res.status(400).json({ message: error.message })
  }
}

export const logoutUser = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: "Logout successful" });
}

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export const editStatus = async (req, res) => {
  const userId = req.params.id;
  const { name, password, profilePicture } = req.body;
  
  if (!name || !password)
    return res.status(400).json({ message: "Name and Password are required" });
  
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, { name, password, profilePicture }, { new: true });
    return res.status(200).json({ message: "User updated successfully", updatedUser: updatedUser._id });

  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}