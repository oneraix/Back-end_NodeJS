import { responseError } from "./response.helper.js";
import  jwt from "jsonwebtoken";
import { statusCodes } from "./status-code.helper.js";

const handleError = (err,req, res,next)=>{


        console.log ("Middleware Special Error", err);
        if(err instanceof jwt.JsonWebTokenError){
            console.log("Token không hợp lệ")
            err.code = statusCodes.UNAUTHORIZED;
        }

        if(err instanceof jwt.TokenExpiredError ){
            console.log("Token hết hạn")
            err.code = statusCodes.FORBIDDEN;
        }

        const resData = responseError(err?.message,err?.code , err?.stack)
        res.status(resData.statusCode).json(resData)
    }

export default handleError;