import express from "express";
import { DataTypes, Sequelize } from "sequelize";
import initModels from "./src/models/init-models.js";
import rootRouter from "./src/routers/root.router.js";
import { DATABASE_URL } from "./src/common/constant/app.constant.js";
const app = express()

//middleware
app.use(express.json())// chuyển dữ liệu từ JSON sang dôi tượng javascript

app.use(rootRouter)
//app.use( rootRouter)
//app.use(demoRouter)



//---------------------------4 CÁCH NHẬN DỮ LIỆU TỪ FRONT-END----------------------------------- 

//---QUERY (bắt đầu bằng dấu "?" và phân tách biến bằng dấu "&")
//thường dùng khi phân trang, lọc, tìm kiếm


//---PARAMS (bắt đầu bằng dấu "/:id" )
//thường dùng để lấy thông tin chi tiết


//---HEADERS
//thường dùng khi gửi token , x-api-key

//---BODY
//thường sử dụng khi tạo mới dữ liệu, dữ liệu gửi lên nhiều




//MYSQL



//SEQUELIZE
const sequelize = new Sequelize(DATABASE_URL);


//CODE FIRST
//model
const Roles = sequelize.define("Roles",{ //modelname ở đây là tên để gọi trong code back-end không hẳn là tên table trong database
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    description:{
        type: DataTypes.STRING,
        allowNull:true
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull: true
    },
    deletedBy:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    deletedAt:{
        type:"TIMESTAMP",
        allowNull:true
    },
    createdAt:{
        type:"TIMESTAMP",
        allowNull:false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt:{
        type:"TIMESTAMP",
        allowNull:false,
        defaultValue:sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }


},
{
    
    tableName:"Roles",//trong code first đây sẽ là tên table được tạo.
    timestamps: false,
}

)
Roles.sync();


//DATABASE FIRST
//đồng bộ database vào code bằng Sequelize-Auto
//npx sequelize-auto -h localhost -d db_cyber_community_code -u root -x 1234 -p 3307 --dialect mysql -o ./models -l esm -a ./additional.json
const models = initModels(sequelize);



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