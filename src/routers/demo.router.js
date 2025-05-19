import express from "express";
import demoController from "../controllers/demo.controller.js";

const demoRouter = express.Router();

demoRouter.get("/helloworld", demoController.helloWorld)

demoRouter.get("/query",demoController.query)



demoRouter.get("/params/:id",demoController.params );


demoRouter.delete("/headers", demoController.headers);


demoRouter.post("/body", demoController.body);

demoRouter.get("/mysql2", demoController.mysql2);

demoRouter.get("/sequelize",
    (req,res, next)=>{
        const dataMid1 = {
            a:1,
            b:1,
            c:1
        };
        res.long= dataMid1
        req.long =dataMid1
        console.log("Middleware 1", dataMid1)
        next();
    },
    (req,res,next)=>{
        console.log("Middleware 2", req.long, res.long)
        next();
    },
    (req,res,next)=>{
        console.log("Middleware 3")
        next();
    },

    demoController.sequelize);


export default demoRouter;