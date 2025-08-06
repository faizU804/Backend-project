import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        username  : {
            type : String,   
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true    // use index to speed up query and it can be expensive optmize them             
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        fullName : {
             type : String,
            required : true,
            trim : true,
            index : true
        },
        avatar : {
            type : String,   //cloudinary service we use 
            required :true
        },
        coverImage : {
            type : String,
        },
        watchHistory : [
            {
            type : mongoose.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type : String,
        required : [true , "password is required"]
    },
    refreshToken : {
        type : String,
    }
},
    {
        timestamps : true
    }
)


userSchema.pre("save" , async function (next) {

    if(!this.isModified("password")) return next()   // you also use the if else syntx here

    this.password = bcrypt.hash(this.password , 10)   //given context and 2nd time use 10 rounds
    next()
})


// we also use bcrypt it hash tha pass also check the pass is correct or not so we make custom methods 

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}



// jwt token generation and verification here 

userSchema.methods.generateAccessToken = function () {
   return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}

export const User = mongoose.model("User", userSchema)