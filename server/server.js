import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/user.routes.js';
import ownerRouter from './routes/owner.routes.js';
import bookingRouter from './routes/booking.routes.js';

const app = express();

// Initialize database connection with singleton pattern
let dbConnected = false;
const initializeDB = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
};

// Connect to DB on startup (non-blocking)
initializeDB().catch(err => {
  console.error('Failed to connect to database:', err.message);
});

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Server is running")
})

app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})