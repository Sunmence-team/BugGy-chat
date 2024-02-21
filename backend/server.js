import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import connectdB from "./dB/connect.js";
import authRoute from "./routes/authRutes.js";
import cors from 'cors';

const app = express();

//dotenv configuration
dotenv.config();

//database
connectdB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

// Routes
app.get("/", (req, res)=>{
    res.send(`<h1>welcome to home page</h1>`);
});

// Authentication routes
app.use('/api/v1/auth', authRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`server is running on ${process.env.DEV_MODE} port ${PORT}`.blue);
});
