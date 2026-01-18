import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://amnanehal963_db_user:quizweb123@cluster0.h27x9v1.mongodb.net/QuizWeb')
    .then(()=>{console.log("DB CONNECTED")})
}