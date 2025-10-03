import User from "../models/user.model.js";
import fs, { access } from 'fs';
import imagekit from "../configs/imagekit.js";
import { Car } from "../models/car.model.js";
import { Booking } from "../models/booking.model.js";

//Change role to owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const {_id} = req.user;
    if(!_id){
      return res.status(404).json({success:false,message:"User ID is required"});
    }
    await User.findByIdAndUpdate(_id,{role:"owner"});
    return res.status(201).json({success:true,message:"Role changed to owner"});
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({success:false, message: error.message });
  }
}

//API to list Car
export const addCar = async (req, res) => {
  try {
    const {_id} = req.user;
    if(!_id){
      return res.status(404).json({success:false,message:"User ID is required"});
    }
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file : fileBuffer, //required
      fileName : imageFile.originalname,   //required
      folder: "/cars/"
    });

    // optimisation through imagekit
    var optimizedImageUrl = imagekit.url({
        path : response.filePath,
        transformation : [
          {width:'1200'},
          {quality:'auto'},//Auto compression
          {format:'webp'} //modern format
        ]
    });

    const image = optimizedImageUrl
    await Car.create({...car,owner:_id,image})
    
    return res.status(201).json({success:true,message:"Car added successfully"});

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({success:false, message: error.message });
  } 
}

//API to get all cars of an owner
export const getOwnerCars = async (req, res) => {
  try {
    const {_id} = req.user;
    const cars = await Car.find({owner:_id})
    return res.status(200).json({success:true,cars});

  }catch (error) {
    console.log(error.message)
    return res.status(500).json({success:false, message: error.message });
  } 
}
//API to update car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const {_id} = req.user;
    const {carId} = req.body;

    const car = await Car.findById(carId);
    //check if the car belongs to the owner
    if(car.owner.toString() !== _id){
      return res.status(403).json({success:false,message:"You are not authorized to update this car"});
    }
    car.isAvailable = !car.isAvailable;
    await car.save();
    return res.status(200).json({success:true,message:"Car availability updated successfully"});
  }catch (error) {
    console.log(error.message)
    return res.status(500).json({success:false, message: error.message });
  } 
}  
//API to delete a car
export const deleteCar = async (req, res) => {
  try {
    const {_id} = req.user;
    const {carId} = req.body;
    const car = await Car.findById(carId);
    //check if the car belongs to the owner
    if(car.owner.toString() !== _id){
      return res.status(403).json({success:false,message:"You are not authorized to delete this car"});
    }
    car.owner = null; // Remove owner reference
    car.isAvailable = false; // Mark car as unavailable
    await car.save();
    return res.status(200).json({success:true,message:"Car Removed successfully"});
  }catch (error) {
    console.log(error.message)
    return res.status(500).json({success:false, message: error.message });
  }
}
//API to get dashboard data for owner
export const getDashboardData = async (req, res) => {
  try {
    const {_id,role} = req.user;
    if(role!="owner"){
      return res.status(403).json({success:false, message:"unauthorized" })
    }
    const cars = await Car.find({owner:_id})
    const bookings = await Booking.find({owner:_id}).populate("car").sort({createdAt:-1}).lean();
    const pendingBooking = await Booking.find({owner:_id,status:"pending"})
    const completedBooking = await Booking.find({owner:_id,status:"confirmed"})

    //calculate monthly revenue
    const monthlyRevenue = bookings.slice().filter(booking => booking.status === "confirmed").reduce((acc, booking)=>acc + booking.price,0)

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBooking.length,
      completedBooking: completedBooking.length,
      recentBookings: bookings.slice(0,3),
      monthlyRevenue
    }

    return res.status(200).json({ success: true, dashboardData });
  }catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: error.message });
  }
}

//API to update user image
export const updateUserImage = async(req,res)=>{
  try {
    const {_id} = req.user
    const imageFile = req.file;

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file : fileBuffer, //required
      fileName : imageFile.originalname,   //required
      folder: "/users/"
    });

    // optimisation through imagekit
    var optimizedImageUrl = imagekit.url({
        path : response.filePath,
        transformation : [
          {width:'400'},
          {quality:'auto'},//Auto compression
          {format:'webp'} //modern format
        ]
    });

    const image = optimizedImageUrl
    await User.findByIdAndUpdate(_id,{image})
    return res.status(200).json({ success: true, message: "Image updated" })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: error.message });
  }
}