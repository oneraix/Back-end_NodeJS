import express from "express";
import demoController from "../controllers/demo.controller.js";

const demoRouter = express.Router();

demoRouter.get("/helloworld", demoController.helloWorld)

demoRouter.get("/query",demoController.query)



demoRouter.get("/params/:id",demoController.params );


demoRouter.delete("/headers", demoController.headers);


demoRouter.post("/body", demoController.body);

demoRouter.get("/mysql2", demoController.mysql2);

demoRouter.get("/sequelize", demoController.sequelize);


export default demoRouter;