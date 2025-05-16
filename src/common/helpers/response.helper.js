export const responseSuccess = (data = null, message=`ok`, statusCode= 200)=>{
    return{
        status: `success`,
        statusCode: statusCode,
        message: message,
        data: data,
        doc: "domain.com/swagger",
    };
}