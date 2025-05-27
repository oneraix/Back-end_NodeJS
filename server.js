import express from "express";
import { DataTypes, Sequelize } from "sequelize";
import initModels from "./src/models/init-models.js";
import rootRouter from "./src/routers/root.router.js";
import { DATABASE_URL } from "./src/common/constant/app.constant.js";
import handleError from "./src/common/helpers/handleError.helper.js";
import morgan from "morgan";
import logApi from "./src/common/morgan/init.morgan.js";
import prisma from "./src/common/prisma/init.prisma.js";
import cors from "cors"
const app = express()

//middleware
app.use(express.json())// chuyển dữ liệu từ JSON sang dôi tượng javascript
app.use(cors({origin:'*'}))
app.use(logApi);


app.use(rootRouter)
app.use(handleError)




app.listen(3069, () =>{
    console.log(`Server is running on port http://localhost:3069`);
});

/**
 * express: lõi để xây dựng BE -> API
 * nodemon: reload lại server khi có code thay
 * mysql2: để tương tác với DB bằng CÂU LỆNH SQL
 * sequelize: ORM giúp tương tác với DB bằng function
 * sequelize-auto: Tự động tạo code model cho sequelize từ database có sẵn
 */