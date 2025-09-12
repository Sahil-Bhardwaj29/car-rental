import express from 'express';
import { changeRoleToOwner } from '../controllers/owner.controller.js';
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

export default ownerRouter;