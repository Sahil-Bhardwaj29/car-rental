import express from 'express';
import { changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability, updateUserImage } from '../controllers/owner.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.js';
import { addCar } from '../controllers/owner.controller.js';

const ownerRouter = express.Router();

// Define owner-related routes here
// Example:
// ownerRouter.post('/register', registerOwner);
// ownerRouter.post('/login', loginOwner);
ownerRouter.post('/change-role', protect, changeRoleToOwner);
ownerRouter.post('/add-car', upload.single("image"),protect, addCar);
ownerRouter.get('/cars',protect, getOwnerCars);
ownerRouter.post('/toggle-car',protect, toggleCarAvailability);
ownerRouter.post('/delete-car',protect, deleteCar);
ownerRouter.get('/dashboard',protect,getDashboardData);
ownerRouter.post('/update-image',upload.single("image"),protect,updateUserImage)

export default ownerRouter;