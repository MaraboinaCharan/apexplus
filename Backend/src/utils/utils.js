 export const globalError=(req,res,err,next)=>{
    return sendResponse(res,404,"Failed","Soemthing went Wrong OR Server Error",null);
 }
 
 export const sendResponse=(res,statusCode,status,message,data) => {
    return res.status(statusCode).json({
        status,
        message,
        data
    });
};


