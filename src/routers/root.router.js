import express from "express";
import demoRouter from "./demo.router.js";

const rootRouter = express.Router();

rootRouter.use("/demo",demoRouter)//từ khoá use sẽ không phân biệt phương thức (post, get, delete,...)

export default rootRouter;