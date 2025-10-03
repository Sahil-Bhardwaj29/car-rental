import express from "express";
import { changeBookingStatus, checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBookings } from "../controllers/booking.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const bookingRouter = express.Router();
bookingRouter.post("/check-availablity",checkAvailabilityOfCar)
bookingRouter.post("/create",protect,createBooking)
bookingRouter.get("/user",protect,getUserBookings)
bookingRouter.get("/owner",protect,getOwnerBookings)
bookingRouter.post("/change-status",protect,changeBookingStatus)

export default bookingRouter;