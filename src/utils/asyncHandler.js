const asyncHandler = (requestHandler) =>{
   return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error))
  }
}


export {asyncHandler}





// higher order function or those that act like variable or pass through paramerts or return ftn .



// this is first method we use only above method and make them a wrapper 

// const asyncHandler = (fn) => async(req , res , next)=> {
//     try {
//        await fn(req, res, next);
//     } catch (error) {
//         res.staus(error.code || 500).json({
//             success : false,
//             message : error.message
//         })
//     }
// }

