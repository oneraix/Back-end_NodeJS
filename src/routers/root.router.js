import express from "express";
import demoRouter from "./demo.router.js";
import articleRouter from "./article.router.js";
import authRouter from "./auth.router.js";

const rootRouter = express.Router();

rootRouter.use("/demo",demoRouter)//từ khoá use sẽ không phân biệt phương thức (post, get, delete,...)
rootRouter.use("/article",articleRouter)
rootRouter.use("/auth", authRouter)
rootRouter.use("/goole-login",authRouter )

export default rootRouter;