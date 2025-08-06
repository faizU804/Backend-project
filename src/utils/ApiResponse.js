class ApiResponse {
    constructor(statusCode, data , message = "success"){
        this.message = message,
        this.data = data
        this.statusCode = statusCode < 400   // status code must be less then 400 
        this.success = statusCode
    }
}