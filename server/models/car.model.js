import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const carSchema = new mongoose.Schema({
  owner:{
    type:ObjectId,  
    ref:"User",
  },
  brand:{
    type:String,
    required:true,
  },
  model:{
    type:String,
    required:true,
  },
  year:{
    type:Number,
    required:true,
  },
  image:{
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
  seating_capacity:{
    type:Number,
    required:true,
  },
  transmission:{
    type:String,
    required:true,
  },
  fuel_type:{ 
    type:String,
    required:true,
  },
  pricePerDay:{
    type:Number,
    required:true,  
    min:0,
  },
  location:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    default:""
  },
  isAvailable:{
    type:Boolean,
    default:true,
  }
},{timestamps:true})

export const Car = mongoose.model("Car", carSchema);