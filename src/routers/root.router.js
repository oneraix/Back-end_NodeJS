import express from "express";
import demoRouter from "./demo.router.js";
import articleRouter from "./article.router.js";
import authRouter from "./auth.router.js";
import { roleCotroller } from "../controllers/role.controller.js";
import roleRouter from "./role.router.js";
import { permissionController } from "../controllers/permission.controller.js";
import permissionRouter from "./permission.router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../common/swagger/swagger.js";


const rootRouter = express.Router();

rootRouter.use('/api-docs', swaggerUi.serve);
rootRouter.get('/api-docs', swaggerUi.setup(swaggerDocument))

rootRouter.use("/demo",demoRouter)//từ khoá use sẽ không phân biệt phương thức (post, get, delete,...)
rootRouter.use("/article",articleRouter)
rootRouter.use("/auth", authRouter)
rootRouter.use("/role", roleRouter)
rootRouter.use("/permission" , permissionRouter)
export default rootRouter;