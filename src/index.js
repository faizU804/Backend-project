/**  second approch is know we use  */
import dotenv from "dotenv"
import connectDB from "./db/index.js";

// howe we connect the dotenv pakg dependencies/ we confing after import them

dotenv.config({
  path : './env'
})


connectDB();







































/* This is over first approch of over db connection here given belwo  */
/* initalize the app of express also   */

/** 
import mongoose from 'mongoose';
import {MOGNODB_URI} from './constants'

import express from 'express'

const app = express()

// ;()()   in some iffes they use semicolon so its for over security below line have no semicolon

(async ()=>{
    try {
      await mongoose.connect(`${process.env.MOGNODB_URI}/${MOGNODB_URI}`)
      app.on("error", (error)=>{
        console.log("error :" , error)
        throw error
      })
      app.listen(process.env.PORT , ()=>{
        console.log(`App is listening on port ${process.env.PORT}` )
      })
    } catch (error) {
        console.log("ERROR " , error)
        throw error
    }
})()
    */