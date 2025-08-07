import express from 'express';
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express();

// first we configure the CORS then also see his methods

app.use(cors({
    origin : process.env.CORS_ORIGION,
    credentials: true
}))

// know configuration for data when its come from form or json so we need to handle them 

app.use(express.json({limit:"16kb"}))

// know configuration for URL when data come from url 

app.use(express.urlencoded({limit: "16kb", extended: true}))


// know we configure that need to store the images on server so we need to configure the middleware for that

app.use(express.static("public"))

// know we configure the cookie parser 

app.use(cookieParser())




// after above task we define the router here and import here for over work 

import userRouter from "./routes/user.routes.js"

//here we do router decleration 

// app.use("/users" , userRouter) // this is simple when api is not use
// https://localhost:8000/users/register etc

// if we use api then we tell them exactly with his version

app.use("/api/v1/users", userRouter)
// https://localhost:8000/api/v1/users/register etc url look like this and this is the way to make any url 





export { app }