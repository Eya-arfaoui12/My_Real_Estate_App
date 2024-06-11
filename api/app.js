import express from "express";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

const app = express();

dotenv.config(); // Load environment variables from .env

app.use(express.json()); //allow my app to send json  
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(8800, ()=>{
    console.log("Server is running!")
});