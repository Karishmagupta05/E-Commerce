// const express=require('express');
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import  Path, { dirname } from "path";
import path from "path";
import {fileURLToPath} from "url";

//configure env
dotenv.config();

//database config
connectDB();
//fix
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
//rest object
const app=express();

//middleware
app.use(cors());
app.use(express.json());// now we can also send data in json format
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
// app.get("/",(req,res)=>{
//     res.send("<h1>welcome baby</h1>");
// });
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})


app.listen(process.env.PORT || 8080);
