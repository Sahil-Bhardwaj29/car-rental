import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Car } from '../models/car.model.js';

const generateToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30d'});
}

//Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    console.log('Register User called with:', req.body);
  
    if([name,email,password].some((field) => field?.trim()==="")) {
      return res.json({success:false, message: "All fields are required" });
    }
    const userExists = await User.findOne({email});
    if(userExists) {
      return res.json({success:false, message: "User already exists" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({name, email, password: hashedPassword});
  
    const token = generateToken(user._id.toString());
    res.json({success:true,token});
  } catch (error) {
    console.log(error.message)
    res.json({success:false, message: error.message });
  }
}
//Login User
export const loginUser = async (req, res) => {
  try{
    const { email, password } = req.body;
    if([email,password].some((field) => field?.trim()==="")) {
      return res.json({success:false, message: "All fields are required" });
    }
    const user = await User.findOne({email})
    if(!user){
      return res.json({success:false, message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
      return res.json({success:false, message: "Invalid credentials" });
    }
    const token = generateToken(user._id.toString());
    res.json({success:true,token});
  }catch(error){
    console.log(error.message)
    res.json({success:false, message: error.message });
  }
}

//Get User data using token
export const getUserData = async (req, res) => {
  try {
    const {user} = req
    res.json({success:true,user})
  } catch (error) {
    console.log(error.message)
    res.json({success:false, message: error.message });
  }
}

// get aLL cars for frontend
export const getCars = async(req,res)=>{
  try {
    const cars = await Car.find({isAvailable:true})
    res.json({success:true, cars });
  } catch (error) {
    console.log(error.message)
    res.json({success:false, message: error.message });
  }
}