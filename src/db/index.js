import mongoose from "mongoose"
import {DB_NAME} from '../constants.js'

const connectDB = async ()=>{
    try {
       const connectionInstance =  await mongoose.connect(`${process.env.MOGNODB_URI}/${DB_NAME}`)
        console.log(`mongodb is connected !! DB host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error is ", error );
        process.exit(1)
    }
}
export default connectDB