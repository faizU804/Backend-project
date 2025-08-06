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

export { app }