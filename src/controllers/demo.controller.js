import { response } from "express";
import demoService from "../services/demo.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

const demoController ={
    helloWorld: (req,res,next) => {
        const result = demoService.helloWorld();
        const resData = responseSuccess(result,"Gọi api helloworld thành công")
        res.status(resData.statusCode).json(result);
    },

    query: (req, res, next)=>{
        const result = demoService.query(req);
        const resData = responseSuccess(result, "Gọi api query thành công")
        res.status(resData.statusCode).json(result);
    },

   params: (req, res, next) => {
      const result = demoService.params(req);
      const resData = responseSuccess(result, "gọi api params thành công")
      res.status(resData.statusCode).json(result);
   },

   headers: (req, res, next) => {
      const result = demoService.headers(req);
      resData = responseSuccess(result, "Gọi api headers thành công")
      res.status(resData.statusCode).json(result);
   },

   body: (req, res, next) => {
      const result = demoService.body(req);
      const resData = responseSuccess(result, "Gọi api body thành công")
      res.status(resData.statusCode).json(resData);
   },


   mysql2: async (req, res, next) => {
      const result = await demoService.mysql2(req);
      const resData = responseSuccess(result,"Gọi api Mysql2 thành công")
      res.status(resData.statusCode).json(resData);
   },

      sequelize: async (req, res, next) => {
      const result = await demoService.sequelize();
      const resData = responseSuccess(result, "Gọi api Sequelize thành công")
      res.status(resData.statusCode).json(resData);
   },

}



export default demoController