import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/user.routes.js';
import ownerRouter from './routes/owner.routes.js';

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Server is running")
})

app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})