import { responseError } from "./response.helper.js";


const handleError = (err,req, res,next)=>{
        console.log ("Middleware Error", err);
        const resData = responseError(err?.message,err?.code , err?.stack)
        res.status(resData.statusCode).json(resData)
    }

export default handleError;