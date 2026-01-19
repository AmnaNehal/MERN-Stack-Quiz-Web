import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userModel from './models/userModel.js';
import userRouter from './routes/userRoutes.js';
import resultRouter from './routes/resultRoutes.js';

const app = express();
const port = process.env.PORT || 4000;


//MIDDLEWARE
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//DB
connectDB();

//ROUTES
app.use('/api/auth', userRouter);
app.use('/api/results', resultRouter);

app.get('/', (req,res) => {
    res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});