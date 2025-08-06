class ApiError extends Error{
    constructor(statusCode , message ="Something went wrong", errors = [] , statck = ""){
        super(message);
        this.message = message;
        this.statusCode = statusCode,
        this.errors = errors;
        this.data = null;
        this.success = false;

        // this piece of code is use to protect the data 
        
        if(statck){
            this.stack = statck
        } 
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    
    }

}


export {ApiError}