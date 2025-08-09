import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"



const registerUser = asyncHandler( async (req, res) => {
  
  // task we need to do is given below to register the user 

    // get data from frontend 
    // validation - not empty as you wish you make your validations etc empty for gmail @ sign inlcude or not etc
    //chekc user is already exist or not 
    // chek for image for avatar
    //upload them to cloudinary avatar
    //create user object - create entery in db
    //remove the pass and refresh token 
    // check for user creation
    // return response 
  
  //  req.body is in data available for json and form but not that come from URL card
  const {fullName , email , password , username } = req.body
  // console.log("email is varified" , email)
  
  

  //first syntx is this this is for begginers 
    // if(fullName === ""){
    //   throw new ApiError(400, "name is required")
    // }
      

    // second method to check them use some method like this

  // check no field is empty here 
  if([username , fullName, email , password].some( (fields) => fields?.trim() === "" ))
    {
      throw new ApiError (400 , "Please fill in all fields");
    }

    // third task is user already exist or not by username 


    // findone we write over query here that fetch data from the mongodb
      const existedUser = await User.findOne(
      {
        $or : [
          {username},{email}
        ]
      }
    )

    if(existedUser){
      throw new ApiError (409 , "user already existed")
    }

    // check the images for avatar 
    console.log(req.files)
   const avatarLocalPath =  req.files?.avatar[0]?.path;
  // here we do for coverimage so we do below 
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
  }




  // here we check the avatar is propely uploded or not 


  if(!avatarLocalPath){
    throw new ApiError (400 , "avatar file is required")
  }

  // upload them to cloudinary  . we first import the cloudinary method here then we use card

  const avtar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  // check avatar upload or not 

  if(!avtar){
    throw new ApiError(400 , "avatar is required")
  }

// create object and make an entery 

  const user = await User.create({
    fullName,
    avatar : avtar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()
  })

  // check user is created or not 
  // select method is use for remove the password and refresh token from the object . 
  // you also do above with user by making undefined but this syntx is wired but good

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError (500 , "something went wrong while registering the user")
  }
// here we register the user successfully  so we return the whole response we need apiresponse that we make in utils folder 

  return res.status(201).json(
    new ApiResponse(200 , createdUser , "User registered successfully")
  )


} )


export {registerUser}

