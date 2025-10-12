import {Booking} from "../models/booking.model.js";
import {Car} from "../models/car.model.js";
//check availablity
const checkAvailablity = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: returnDate },
  });
  return bookings.length === 0;
};

// API to check availability for given dates and location
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    const cars = await Car.find({ location, isAvailable: true });

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailablity(
        car._id,
        new Date(pickupDate),
        new Date(returnDate)
      );
      return { ...car._doc, isAvailable: isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car.isAvailable === true);

    return res.status(200).json({ success: true, availableCars });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to create booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;
    const isAvailable = await checkAvailablity(
      car,
      new Date(pickupDate),
      new Date(returnDate)
    );
    if (!isAvailable) {
      return res
        .status(500)
        .json({ success: false, message: "car is not available" });
    }
    const carData = await Car.findById(car);
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = noOfDays * carData.pricePerDay;

    const booking = await Booking.create({
      user: _id,
      car,
      pickupDate,
      returnDate,
      price,
      owner: carData.owner,
    });
    return res
      .status(200)
      .json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to get bookings of a user
export const getUserBookings = async (req, res) => {
  try {
    const {_id} = req.user;
    const bookings = await Booking.find({user:_id}).populate("car").sort({createdAt:-1});
    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to get bookings of a owner
export const getOwnerBookings = async (req, res) => {
  try {
    if(req.user.role !== "owner"){
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    const {_id} = req.user;
    const bookings = await Booking.find({owner:_id}).populate("car user").select("-user.password").sort({createdAt:-1});
    return res.status(200).json({ success: true, bookings });
  }catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}

// API to update booking status
export const changeBookingStatus = async (req, res) => {
  try{
    const {_id} = req.user;
    const {bookingId, status} = req.body;
    
    if(!bookingId || !status){
      return res.status(400).json({ success: false, message: "Booking ID and status are required" });
    }

    const booking = await Booking.findById(bookingId);
    if(!booking){
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    const ownerId = booking.owner._id ? booking.owner._id.toString() : booking.owner.toString();
    if(ownerId !== _id.toString()){
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    booking.status = status;
    await booking.save();
    return res.status(200).json({ success: true, message: "Booking status updated successfully" });

  }catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}

