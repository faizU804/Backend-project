import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
      message : "work is done and server running on port 200"  
    })
} )


export {registerUser}